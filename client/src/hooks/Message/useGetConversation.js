import { useEffect, useState } from 'react';
import { currentUser } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../useAxiosPrivate';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get('/api/user', {
                headers: { token: `bearer ${User.accessToken}` },
            });

            const data = res.data?.users.filter((user) => user.username !== User.username);

            setConversations(data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return { loading, conversations };
};
export default useGetConversations;
