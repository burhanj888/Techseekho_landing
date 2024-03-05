import { axiosPrivate } from '../Api/Axios'
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401) {
                    try {
                        await refresh();  // Refresh the access token
                        return axiosPrivate(prevRequest);  // Retry the previous request
                    } catch (refreshError) {
                        console.error('Failed to refresh token:', refreshError);
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;
