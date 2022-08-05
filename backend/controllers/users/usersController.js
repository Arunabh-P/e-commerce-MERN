const { validationResult} = require("express-validator");

const UserModel = require("../../models/user");

const {hashedPassword, createToken} = require("../../services/authServices")


//@route POST /api/register
//@access Public
//@desc Create user and return a token
module.exports.register = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {name, email, password} = req.body;
        try {
            const emailExist = await UserModel.findOne({email})
            if(!emailExist){
                const hashed = await hashedPassword(password);
                const user = await UserModel.create({
                    name,
                    email,
                    password : hashed,
                });
                const token = createToken({id : user._id, name : user.name});

                return res.status(200).json({msg:'Your account has been created',token})

            }else{

                //email already taken
                // 401 : unautherised
                return res.status(401).json({errors:[{msg:`${email} is already taken!`}]})      
            }
        } catch (error) {
            console.log(error.message);

            // 500 : server error
            return res.status(500).json("Server internal error!")      
        }
    }else{

        //validation failed
        // 400 : bad request
        return res.status(400).json({errors:errors.array()})        

    }

}