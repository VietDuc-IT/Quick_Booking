import React, { useEffect, useState } from 'react';
import Banner from '~/components/public/Banner';
import Cards from '~/components/public/CardProduct';
import Search from '~/components/Search';
import DropDown from '~/components/DropDown';
import Button from '~/components/Button';
import axios from '~/ultils/axios';

function Home() {
    const [posts, setPosts] = useState();
    const [category, setCategory] = useState();

    const fetchData = async () => {
        try {
            const cate = await axios.get('/api/category');
            setCategory(cate.data);
            const post = await axios.get('/api/post');
            setPosts(post.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const area = [
        { id: 1, name: 'TP Hồ Chí Minh' },
        { id: 2, name: 'Hà Nội' },
        { id: 3, name: 'Đà Nẵng' },
        { id: 4, name: 'Cần Thơ' },
        { id: 5, name: 'Bình Dương' },
        { id: 6, name: 'Bình Phước' },
        { id: 7, name: 'Đắk Lắk' },
        { id: 8, name: 'Bình Định' },
        { id: 9, name: 'Bình Thuận' },
    ];

    const price = [
        { id: 1, name: 'Dưới 5 triệu' },
        { id: 2, name: '5 - 10 triệu' },
        { id: 3, name: '10 - 15 triệu' },
        { id: 4, name: '15 - 20 triệu' },
        { id: 5, name: '20 - 25 triệu' },
        { id: 6, name: '25 - 30 triệu' },
        { id: 7, name: '30 - 40 triệu' },
        { id: 8, name: '40 - 50 triệu' },
        { id: 9, name: 'Trên 50 triệu' },
    ];

    return (
        <>
            {/* BANNER */}
            <Banner />

            {/* Search */}
            <div className="flex justify-center -translate-y-8 relative z-10">
                <div className="flex bg-m_main dark:bg-d_main py-4 px-7 space-x-5 items-center rounded-lg">
                    <Search />
                    {/* {category.name === 'Vị trí' && <DropDown name="Vị trí" list={area} />} */}
                    <DropDown name="Vị trí" list={area} />
                    <DropDown name="Mức giá" list={price} />
                    <Button btn="primary">Tìm kiếm</Button>
                </div>
            </div>

            {/* Home card */}
            <div className="w-full">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Căn nhà tốt nhất</span>
                    </div>
                    <Cards Data={posts?.Post} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline">Xem thêm ...</Button>
                    </div>
                </div>
            </div>

            {/* Renter card */}
            <div className="w-full bg-m_main dark:bg-d_main">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Chủ nhà được ưa thích nhất</span>
                    </div>
                    {/* <Cards DataHouse={data} /> */}
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline">Xem thêm ...</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
