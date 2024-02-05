const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs")

let users = []

const secretKey = fs.readFileSync('./private.key', 'utf-8');

const signUp = async (req, res) =>{

    try{
    const { firstName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const data = {
    firstName,
    email,
    password : hashedPassword
    }
    users.push(data)


    if (users.length > 0) {
     let token = jwt.sign({ id: '1' }, secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(users, null, 2));
     console.log(token);
     console.log(users);
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
   
    const verify = users.find(data => data.email === req.body.email)

    console.log(users)

    if(verify == null){
    return res.status(400).send("user not found")
    }
    try{
    if(verify)
    {
    const isSame = await bcrypt.compare(req.body.password, verify.password)
    if(isSame){
      let token = jwt.sign({ id: "1" }, "dsalkdndlkask", {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      // console.log("user", JSON.stringify(verify, null, 2));
      // console.log(token);
       return res.json({
        sucess : true,
        data : {
          username : verify.username,
          authtoken : token
        }
       });
    }
    }else{
    res.send("Not allowed")
    }
    }catch{
    res.status(500).send("Error")
    }
}

module.exports= {
signUp,
Login
}