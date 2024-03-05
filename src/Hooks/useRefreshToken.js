import axiosPrivate from '../Api/Axios';
import useAuth from './AuthHooks';
import { useNavigate } from 'react-router-dom'; 
// import Toast from 'react-bootstrap/Toast';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';


const useRefreshToken = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.get('/refresh', {
                withCredentials: true
            });
            console.log(response.data);
            // Update the user state if necessary
            setUser(prev => ({ ...prev, accessToken: response.data.accessToken }));
            return response.data.accessToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            if (error?.response?.status === 403) {
                alert("Session Expired! Login again.")
                  localStorage.clear();
                  navigate('/');
            }
            throw error;  // Rethrow the error to be caught by the caller
        }
    };

    return refresh;
};

export default useRefreshToken;
