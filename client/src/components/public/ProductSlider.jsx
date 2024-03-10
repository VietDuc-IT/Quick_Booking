import { Carousel } from 'flowbite-react';

function ProductSlider({ img }) {
    return (
        <>
            <div className="h-96 w-2/3 mx-auto">
                <Carousel>
                    {img?.map((index) => (
                        <img src={index} alt="..." />
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default ProductSlider;
