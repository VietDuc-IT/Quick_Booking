import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useGetConversations from '~/hooks/Message/useGetConversation';
import useConversation from '~/zustand/useConversation';

function SearchInput() {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error('Nhập ít nhất 3 kí tự để tìm ...');
        }

        const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else toast.error('Không tìm thấy người dùng!');
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="p-3 flex items-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm ... "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered rounded-full text-gray-700"
                />
                <button type="submit" className="ml-3">
                    <FaSearch className="h-6 w-6 hover:text-primary-hover" />
                </button>
            </form>
        </>
    );
}

export default SearchInput;
