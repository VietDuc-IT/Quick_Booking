import React from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

function NotFound() {
    return (
        <section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div class="max-w-md text-center">
                    <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span class="sr-only">Error</span>404
                    </h2>
                    <p class="text-2xl font-semibold md:text-3xl">Xin lỗi, chúng tôi không thể tìm thấy trang này.</p>
                    <p class="mt-4 mb-8 dark:text-gray-400">
                        Đừng lo lắng, bạn có thể tìm thấy nhiều thức khác hơn ở TRANH CHỦ của chúng tôi.
                    </p>
                    <Button to="/" btn="primary">
                        Trang chủ
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
