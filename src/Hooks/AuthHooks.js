import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAuth = () => {
    // return useContext(AuthContext);
    const { user } = useContext(AuthContext);
    // useDebugValue(user, user => user?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;