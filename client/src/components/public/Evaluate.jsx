import { HiEmojiSad, HiEmojiHappy } from 'react-icons/hi';

function Evaluate() {
    return (
        <>
            <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5> */}
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    Bạn có hài lòng với trải nghiệm tìm kiếm thông tin, sản phẩm trên website không?
                </p>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    Hãy giúp chúng tôi cải thiện trải nghiệm của bạn.{' '}
                    <span className="text-primary-default">Phản hồi!</span>
                </p>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a
                        href="#"
                        class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                        <HiEmojiHappy class="me-3 w-7 h-7" />

                        <div class="text-left rtl:text-right">
                            <div class="-mt-1 font-sans text-sm font-semibold">Hài lòng</div>
                        </div>
                    </a>
                    <a
                        href="#"
                        class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                        <HiEmojiSad class="me-3 w-7 h-7" />

                        <div class="text-left rtl:text-right">
                            <div class="-mt-1 font-sans text-sm font-semibold">Không hài lòng</div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Evaluate;
