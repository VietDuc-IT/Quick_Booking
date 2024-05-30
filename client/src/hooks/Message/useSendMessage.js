import { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '../useAxiosPrivate';
import { useSelector } from 'react-redux';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axiosPrivate.post(
                '/api/message/send',
                { receiverId: selectedConversation?._id, message: message },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                    withCredentials: true,
                },
            );

            if (res.data.error) throw new Error(res.data.error);

            setMessages([...messages, res.data]);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;
