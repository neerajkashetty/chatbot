import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [Loggedin , setLoggedin] = useState(false);
    const checkusertoken = () =>{
        const userToken = localStorage.getItem('token')
        if (!userToken || userToken === 'undefined'){
            setLoggedin(false)
            navigate('/login')
        }else{
            setLoggedin(true)
        }
    } 
    

useEffect(() => {
    checkusertoken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, );

return Loggedin ? <>{props.children}</> : null;

}
export default ProtectedRoute;

