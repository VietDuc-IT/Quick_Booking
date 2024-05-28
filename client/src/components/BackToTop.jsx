import React, { useState, useEffect } from 'react';

function BackToTop() {
    const [showButton, setShowButton] = useState(false);

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
            // setShowButton(window.scrollY >= 200)
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showButton && (
                <button
                    onClick={backToTop}
                    type="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="fixed bottom-20 end-5 rounded-full bg-primary-default p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-hover hover:shadow-lg focus:bg-primary-hover focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-hover active:shadow-lg"
                    id="btn-back-to-top"
                >
                    <span className="[&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </span>
                </button>
            )}
        </>
    );
}

export default BackToTop;
