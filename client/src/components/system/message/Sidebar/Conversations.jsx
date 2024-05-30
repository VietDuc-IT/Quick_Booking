import useGetConversations from '~/hooks/Message/useGetConversation';
import Card from './Card';

function Conversations() {
    const { loading, conversations } = useGetConversations();

    return (
        <>
            <div class="w-full h-full max-w-md pt-4 pl-4 pr-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-auto">
                {conversations.map((conversation, idx) => (
                    <Card
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversation.length - 1}
                    />
                ))}
            </div>
        </>
    );
}

export default Conversations;
