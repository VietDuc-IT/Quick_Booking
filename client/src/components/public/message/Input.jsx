import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { IoIosSend } from 'react-icons/io';

function Input({ data }) {
    const [message, setMessage] = useState('');
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();

    const sendMessage = async (message) => {
        // setLoading(true);
        try {
            const res = await axiosPrivate.post(
                '/api/message/send',
                { receiverId: data?._id, message: message },
                {
                    headers: { token: `bearer ${User.accessToken}` },
                    withCredentials: true,
                },
            );

            if (res.data.error) throw new Error(res.data.error);

            // setMessages([...messages, res.data]);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="bg-gray-300 dark:bg-gray-700  p-2 flex">
                    <input
                        class="flex items-center h-9 w-full rounded px-3 text-sm dark:text-gray-700"
                        type="text"
                        placeholder="Soạn tin …"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="mx-1">
                        <IoIosSend className="h-6 w-6" />
                    </button>
                </div>
            </form>
        </>
    );
}

export default Input;
