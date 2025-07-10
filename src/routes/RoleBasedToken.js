import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';


const RoleBasedRoute=({children,allowedRules})=>{
    const { role } = useSelector((state) => state.auth);
    return allowedRules.includes(role) ? children : <Navigate to="/patientList" replace/>
};

export default RoleBasedRoute;