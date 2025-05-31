import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps{
    children:JSX.Element
}

const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
    const jwtToken=useSelector((state:any)=>state.jwt);
    if(jwtToken){
        const user:any = jwtDecode(jwtToken);
        return <Navigate to={`/${user?.role?.toLowerCase()}/dashboard`}/>//Navigate to specific dashboard bydefault
    }
    return children;
}


export default PublicRoute;