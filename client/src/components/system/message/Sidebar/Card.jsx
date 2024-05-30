import { useSocketContext } from '~/socket/SocketContext';
import useConversation from '~/zustand/useConversation';

function Card({ conversation, lastIdx }) {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div
                class={`py-3 sm:py-4 dark:hover:bg-gray-700 hover:bg-gray-300 rounded-lg cursor-pointer ${
                    isSelected ? 'dark:bg-gray-700 bg-gray-300' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div class="flex items-center">
                    <div class="relative">
                        <img class="w-10 h-10 rounded-full" src={conversation.profilePicture} alt="" />
                        <span
                            class={`top-0 left-7 absolute  w-3.5 h-3.5 ${
                                isOnline ? 'bg-green-400' : 'bg-red-400'
                            } border-2 border-white dark:border-gray-800 rounded-full`}
                        ></span>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {conversation.username}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">{conversation.email}</p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">.</div>
                </div>
            </div>
        </>
    );
}

export default Card;
