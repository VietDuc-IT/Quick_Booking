function Messages({ message }) {
    return (
        <>
            <div class="flex w-full mt-2 space-x-3 max-w-xs">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-slate-700"></div>
                <div>
                    <div class="bg-gray-300 dark:bg-gray-700 p-3 rounded-r-lg rounded-bl-lg">
                        <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                </div>
            </div>
            <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                    <div class="bg-primary-default text-white p-3 rounded-l-lg rounded-br-lg">
                        <p class="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...
                        </p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                </div>
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
        </>
    );
}

export default Messages;
