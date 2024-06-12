import { IoCloseOutline } from 'react-icons/io5';
import Input from './Input';
import Messages from './Messages';

function MessageContainer({ data, onClose }) {
    return (
        <>
            <div class="fixed bottom-5 end-24">
                {/* <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10"> */}
                <div class="flex flex-col flex-grow w-full max-w-xl h-96 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                    <div class="bg-gray-300 dark:bg-gray-700 p-2 flex justify-between">
                        <div className="flex items-center">
                            <img class="w-7 h-7 rounded-full" src={data?.profilePicture} alt="Rounded avatar" />
                            <p className="ml-5">{data?.username}</p>
                        </div>
                        <div className="flex items-center">
                            <IoCloseOutline className="h-5 w-5 cursor-pointer" onClick={onClose} />
                        </div>
                    </div>

                    <Messages userId={data._id} />

                    {/* <Input data={data} /> */}
                </div>
            </div>
        </>
    );
}

export default MessageContainer;
