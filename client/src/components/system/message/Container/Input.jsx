import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import useSendMessage from '~/hooks/Message/useSendMessage';

function Input() {
    const [message, setMessage] = useState('');
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="bg-gray-200 dark:bg-gray-700  p-2 flex">
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
