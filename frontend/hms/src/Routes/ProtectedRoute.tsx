import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    children:JSX.Element
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
    const jwtToken=useSelector((state:any)=>state.jwt);
    if(jwtToken){
        return children;
    }
    return <Navigate to="/login"/>;
}

export default ProtectedRoute;