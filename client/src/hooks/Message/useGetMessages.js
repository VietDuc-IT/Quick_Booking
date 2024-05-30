import { useEffect, useState } from 'react';
import useConversation from '~/zustand/useConversation';
import toast from 'react-hot-toast';
import { currentUser } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../useAxiosPrivate';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();

    const getMessages = async () => {
        setLoading(true);
        try {
            const res = await axiosPrivate.get(`/api/message/${selectedConversation._id}`, {
                headers: { token: `bearer ${User.accessToken}` },
            });

            setMessages(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};
export default useGetMessages;
