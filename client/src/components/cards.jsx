import React from 'react';

function cards() {
    const dataCard = [
        {
            id: 1,
            title: 'Home 1',
            img: '~/assets/images/house-card.png',
            address: '... Hà nội',
            comment: 5,
            action: 15,
            price: '1.000.000 VNĐ',
        },
        {
            id: 1,
            title: 'Home 1',
            address: '... Hà nội',
            img: '~/assets/images/house-card.png',
            comment: 5,
            action: 15,
            price: '1.000.000 VNĐ',
        },
        {
            id: 1,
            title: 'Home 1',
            address: '... Hà nội',
            img: '~/assets/images/house-card.png',
            comment: 5,
            action: 15,
            price: '1.000.000 VNĐ',
        },
        {
            id: 1,
            title: 'Home 1',
            address: '... Hà nội',
            img: '~/assets/images/house-card.png',
            comment: 5,
            action: 15,
            price: '1.000.000 VNĐ',
        },
        {
            id: 1,
            title: 'Home 1',
            address: '... Hà nội',
            img: '~/assets/images/house-card.png',
            comment: 5,
            action: 15,
            price: '1.000.000 VNĐ',
        },
    ];
    return (
        <>
            <section className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
                {dataCard.map((card) => (
                    <div
                        key={card.id}
                        className="px-4 py-8 text-center md:w-[300] mx -auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-primary dark:hover:border-primary dark:hover:border-b-4 transition-all duration-300 flex items-center justify-center h-full dark:border-2 dark:border-gray-700 "
                    >
                        <div>
                            <div className="bg-gray-200 mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
                                <img src={card.img} alt="" className="-ml-5" />
                            </div>
                            <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">{card.title}</h4>
                            <p className="text-sm text-neutralGrey">{card.address}</p>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}

export default cards;
