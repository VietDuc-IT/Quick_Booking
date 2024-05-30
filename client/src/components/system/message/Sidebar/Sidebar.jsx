import Conversations from './Conversations';
import SearchInput from './SearchInput';

function Sidebar() {
    return (
        <>
            <div className="dark:bg-d_main bg-m_body flex flex-col">
                <SearchInput />
                <Conversations />
            </div>
        </>
    );
}

export default Sidebar;
