import useGetMessages from '~/hooks/Message/useGetMessages';
import Message from './Message';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useEffect, useRef } from 'react';
import useListenMessages from '~/hooks/Message/useListenMessages';

function Messages() {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        return () => clearTimeout(timer);
    }, [messages]);

    return (
        <div className="h-full overflow-auto">
            {messages.length > 0 &&
                messages.map((message) => <Message key={message._id} ref={lastMessageRef} message={message} />)}

            {[...Array(3)].map((_, idx) => (
                <MessageSkeleton key={idx} />
            ))}
            {messages.length === 0 && <p className="text-center">Gửi tin nhắn để bắt đầu trò chuyện ...</p>}
        </div>
    );
}

export default Messages;
