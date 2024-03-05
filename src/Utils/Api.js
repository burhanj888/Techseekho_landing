import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post("http://localhost:8000/api/user/login", { email, password });
    return response.data; 
};