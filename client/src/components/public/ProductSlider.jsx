import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';

function ProductSlider({ img }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? img?.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === img?.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const slideIndex = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);
        return () => clearInterval(slideInterval);
    });

    return (
        <>
            <div className="">
                <div className="w-5/6 h-[400px] mx-auto rounded-lg bg-slate-600">
                    {img && (
                        <img
                            className="w-full h-full rounded-lg bg-center bg-cover duration-500"
                            src={img[currentIndex]}
                        />
                    )}
                </div>
                <div className="w-full h-32 mt-5 flex justify-between items-center">
                    <button
                        className="bg-gray-300 dark:bg-gray-600 rounded-full h-7 w-7 flex justify-center items-center"
                        onClick={prevSlide}
                    >
                        <FaChevronLeft className="hover:text-primary-default" />
                    </button>
                    <div className="w-full grid grid-cols-6 gap-3 mx-3">
                        {img?.map((url, index) => (
                            <div
                                key={index}
                                onClick={() => slideIndex(index)}
                                className={`${currentIndex === index && 'scale-110'}`}
                            >
                                <img className="w-full h-32" src={url} />
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-gray-300 dark:bg-gray-600 rounded-full h-7 w-7 flex justify-center items-center"
                        onClick={nextSlide}
                    >
                        <FaChevronRight className="hover:text-primary-default" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductSlider;
