const express = require('express')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt');
const { signUp, Login } = require('../controllers/userController');



const users = []


//creating the instance of the express with the variable app
const app = express();

//telling the app to accept the json data else it will throw an error of the typeError cannot read properties of undefined
app.use(express.json())

app.use('/api/signUp', signUp)

app.use('/api/Login', Login)



app.get('/user', (req, res) => {
    res.send(user)
})

// app.post('/users', async (req , res)=>{
// try{
// const salt = await bcrypt.genSalt()
// const hashed = await bcrypt.hash(salt + req.body.password, 10)
// const user = {name : req.body.name, password: hashed}
// users.push(user)
// res.status(201).send("Success")
// console.log(users)
// }catch{
//     res.status(500).send("Something is wrong ")
// }
// })


app.listen(3002,() => {

    console.log("Server running on the port 3002")
} )