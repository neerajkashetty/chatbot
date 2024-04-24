import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {validateAuthToken} from "../utils/validateAuthToken";
import { usernameState } from "../atoms/user";
import { useRecoilValue } from "recoil";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const user = useRecoilValue(usernameState);
    console.log(user)
    const [Loggedin , setLoggedin] = useState(false);
    const checkusertoken = () =>{
        const userToken = localStorage.getItem('token')
        if (!userToken || userToken === 'undefined'){
            setLoggedin(false)
            navigate('/login')
        }else{
            setLoggedin(true)
            validateAuthToken(userToken)
        }
    } 
    

useEffect(() => {
    checkusertoken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [Loggedin]);

 return Loggedin ? <>{props.children}</> : null;

}
export default ProtectedRoute;

