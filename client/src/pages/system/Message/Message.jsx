import BreadCrumb from '~/components/system/BreadCrumb';
import Sidebar from '~/components/system/message/Sidebar/Sidebar';
import MessageContainer from '~/components/system/message/Container/MessageContainer';

function Comment() {
    return (
        <>
            <BreadCrumb pageName="Tin nhắn" />

            {/* <div className="grid grid-cols-4 gap-2"> */}
            <div className="flex sm:h-[450px] min-h-[600px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <Sidebar />
                <MessageContainer />
            </div>
        </>
    );
}

export default Comment;
