import axios from "axios";

export const validateAuthToken = (userToken) =>{
    return new Promise( (resolve, reject)=> {
    axios
    .get("http://localhost:3002/api/Login",{
        headers :{
            "Content-type" : "application/json",
             authorization : userToken,
        },
    })
    .then(({ data }) =>{
        return resolve(data)
    }).catch((err)=>{
        return reject(err)
    });
})
}

