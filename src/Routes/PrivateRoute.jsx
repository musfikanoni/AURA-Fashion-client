
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading) {
        return <div className="flex justify-center mt-72">
            <BeatLoader size="xl" />
        </div>
    }
    
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;