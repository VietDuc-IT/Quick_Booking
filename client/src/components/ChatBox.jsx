import { Tooltip } from 'flowbite-react';
import { MdSupportAgent } from 'react-icons/md';

function ChatBox() {
    return (
        <>
            <button
                // onClick={backToTop}
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="fixed bottom-5 end-5 rounded-full bg-primary-default p-1 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-hover hover:shadow-lg focus:bg-primary-hover focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-hover active:shadow-lg"
                id="btn-back-to-top"
            >
                <Tooltip content="Liên hệ" placement="left">
                    <span className="[&>svg]:w-9">
                        <MdSupportAgent size="lg" />
                    </span>
                </Tooltip>
            </button>
        </>
    );
}

export default ChatBox;
