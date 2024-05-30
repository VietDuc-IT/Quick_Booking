import { useEffect, useRef } from 'react';
import Messages from './Messages';
import { toast } from 'react-toastify';
import useConversation from '~/hooks/Message/useConversation';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function MessageContainer() {
    const { messages, setMessages, selectedConversation } = useConversation();
    const axiosPrivate = useAxiosPrivate();

    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, [messages]);

    useEffect(() => {
        const getMessages = async () => {
            // setLoading(true);
            try {
                const res = await axiosPrivate.get(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return (
        <>
            <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Messages message={message} />
                    </div>
                ))}
                {/* <Messages /> */}
            </div>
        </>
    );
}

export default MessageContainer;
