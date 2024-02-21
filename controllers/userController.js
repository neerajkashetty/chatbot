const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../sequelize/models')
const User = db.User
const fs = require("fs");




const signUp = async (req, res) =>{

    try{
    const { firstName, lastName, email, password } = req.body;

    
    const user = await User.findOne({
      where:{
        email: email
      }
    })

    if(user){
      return res.json({error: "Email Already taken"});
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const data = {
    firstName,
    lastName,
    email,
    password : hashedPassword
    }

    const usertable = await User.create(data)
   

    if (usertable) {
     let token = jwt.sign({ id: '1' }, 'dsalkdndlkask', {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
    
     //send users details
     return res.status(201).send(users);
   } 
   else {
     return res.status(409).send("Details are not correct");
    }
    }
    catch(error){
    console.log('error is ', error) 
    }
}


const Login = async (req , res) => {
  try{
   
    const {email , password} = req.body;
    const privateKey = fs.readfileSync("./private.key", "utf8");

    const user = await User.findOne({
      where:{
        email : email
      }
    })
   
  if(user){
    const isSame = await bcrypt.compare(password, user.password)
    if(isSame){
      let token = jwt.sign({ id: "1" }, privateKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
        algorithm: "RS256",
        audience: "users"
      });
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      // console.log("user", JSON.stringify(verify, null, 2));
       console.log(token);
       return res.json({
        sucess : true,
        data : {
          username : user.username,
          authtoken : token
        }
       });
  }
    }
    else{
    res.json({sucess: false , message: "No user with the email"})
    }
  }
    
    catch{
    res.status(500).send("Error")
    }
}

module.exports= {
signUp,
Login
}