import useConversation from '~/zustand/useConversation';
import { currentUser } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import { extractTime } from '~/ultils/extractTime';

function Message({ message }) {
    const User = useSelector(currentUser);
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === User._id;
    const formattedTime = extractTime(message.createdAt);

    return (
        <>
            {!fromMe ? (
                <div class={`flex w-full mt-2 mx-3 space-x-3 max-w-xs`}>
                    <img class="flex-shrink-0 h-10 w-10 rounded-full" src={selectedConversation?.profilePicture} />
                    <div>
                        <div class="bg-gray-300 dark:bg-gray-700 p-3 rounded-r-lg rounded-bl-lg">
                            <p class="text-sm">{message.message}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">{formattedTime}</span>
                    </div>
                </div>
            ) : null}
            {fromMe ? (
                <div class="flex w-full mt-2 mx-3 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                        <div class="bg-primary-default text-white p-3 rounded-l-lg rounded-br-lg">
                            <p class="text-sm">{message.message}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">{formattedTime}</span>
                    </div>

                    <img class="flex-shrink-0 h-10 w-10 rounded-full" src={User.profilePicture} />
                </div>
            ) : null}
        </>
    );
}

export default Message;
