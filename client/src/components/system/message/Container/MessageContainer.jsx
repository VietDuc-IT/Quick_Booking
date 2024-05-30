import { IoCloseOutline } from 'react-icons/io5';
import Input from './Input';
import { TiMessages } from 'react-icons/ti';
import Messages from './Messages';
import useConversation from '~/zustand/useConversation';
import { useSelector } from 'react-redux';
import { currentUser } from '~/redux/selectors';

function MessageContainer() {
    const User = useSelector(currentUser);
    const { selectedConversation, setSelectedConversation } = useConversation();
    return (
        <>
            <div class="flex flex-col flex-grow w-full h-full bg-white dark:bg-gray-800 shadow-xl rounded-r-lg overflow-hidden">
                {!selectedConversation ? (
                    <>
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                                <p>Xin chào 👋 {User.username} ❄</p>
                                <p>Chọn đoạn chát để bắt đầu </p>
                                <TiMessages className="text-3xl md:text-6xl text-center" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div class="bg-gray-200 dark:bg-gray-700 p-2 flex justify-between">
                            <div className="flex items-center">
                                <img
                                    class="w-7 h-7 rounded-full"
                                    src={selectedConversation?.profilePicture}
                                    alt="Rounded avatar"
                                />
                                <p className="ml-5">{selectedConversation?.username}</p>
                            </div>
                            <div className="flex items-center">
                                <IoCloseOutline className="h-5 w-5 cursor-pointer" />
                            </div>
                        </div>

                        <Messages />

                        <Input />
                    </>
                )}
            </div>
        </>
    );
}

export default MessageContainer;
