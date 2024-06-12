import { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageSkeleton from '~/components/system/message/skeletons/MessageSkeleton';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import notificationSound from '~/assets/sounds/notification.mp3';
import { useSocketContext } from '~/socket/SocketContext';
import Input from './Input';

function Messages({ userId }) {
    const [messages, setMessages] = useState([]);
    const User = useSelector(currentUser);
    const axiosPrivate = useAxiosPrivate();
    const lastMessageRef = useRef();

    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            // newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off('newMessage');
    }, [socket, setMessages, messages]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        // setLoading(true);
        try {
            const res = await axiosPrivate.get(`/api/message/${userId}`, {
                headers: { token: `bearer ${User.accessToken}` },
            });

            setMessages(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    const handleSend = () => {
        getMessages();
    };

    return (
        <>
            {/* overflow-auto */}
            <div className="h-full w-[370px] overflow-auto">
                {messages.length > 0 &&
                    messages.map((message) => <Message key={message._id} ref={lastMessageRef} message={message} />)}

                {[...Array(3)].map((_, idx) => (
                    <MessageSkeleton key={idx} />
                ))}
                {messages.length === 0 && <p className="text-center">Gửi tin nhắn để bắt đầu trò chuyện ...</p>}
            </div>
            <Input userId={userId} onSend={handleSend} />
        </>
    );
}

export default Messages;
