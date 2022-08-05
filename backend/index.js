const express = require("express");
const env = require("./config/envConfig");
const connect = require("./config/db");
const userRoutes = require("./routes/users/userRoutes");
const app = express();

//Database connection
connect();

//add middleware
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({msg:'Welcome to shopping page!'});
});

//user routes
app.use('/api',userRoutes);

const port = env.PORT || 5000;

app.listen(port,() => {
    console.log(`Your server is running at port number : ${port}`);
})