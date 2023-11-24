const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const users = []

const signUp = async (req, res) =>{

    try{
    const { userName, email, password } = req.body;
    const data = {
    userName,
    email,
    password : await bcrypt.hash(password, 10)
    }
    users.push(data)

    if (users.length > 0) {
     let token = jwt.sign({ id: '1' }, 'dsalkdndlkask', {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(users, null, 2));
     console.log(token);
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

module.exports= {
signUp
}