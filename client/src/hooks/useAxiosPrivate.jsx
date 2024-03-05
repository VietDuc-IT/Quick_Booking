import { axiosPrivate } from '~/ultils/axios';
import axios from '~/ultils/axios';
import { jwtDecode } from 'jwt-decode';
import { signInSuccess } from '~/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';

const refreshToken = async () => {
    try {
        const res = await axios.post(`/api/user/refreshToken`, '', { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error('Error refreshing token:', err);
    }
};

const useAxiosPrivate = () => {
    const user = useSelector(currentUser);
    const dispatch = useDispatch();
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user.accessToken);

            if (decodedToken.exp < date.getTime() / 1000) {
                try {
                    const data = await refreshToken();
                    const refreshUser = {
                        ...user,
                        accessToken: data.accessToken,
                    };
                    dispatch(signInSuccess(refreshUser));
                    config.headers['token'] = 'Bearer ' + data.accessToken; // Use 'Authorization' header for JWT
                } catch (refreshError) {
                    // Handle refresh error, e.g., logout the user
                    console.error('Error refreshing token:', refreshError);
                }
            }

            return config;
        },
        (err) => Promise.reject(err),
    );
    return newInstance;
};

export default useAxiosPrivate;
