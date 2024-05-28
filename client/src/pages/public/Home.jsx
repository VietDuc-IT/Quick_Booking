import React, { useEffect, useState } from 'react';
import Banner from '~/components/public/Banner';
import CardProduct from '~/components/public/CardProduct';
import CardRenter from '~/components/public/CardRenter';
import Search from '~/components/Search';
import DropDown from '~/components/DropDown';
import Button from '~/components/Button';
import axios from '~/ultils/axios';

function Home() {
    const [posts, setPosts] = useState();
    const [category, setCategory] = useState([]);
    const [renter, setRenter] = useState([]);

    const fetchData = async () => {
        try {
            const cate = await axios.get('/api/category');
            setCategory(cate.data);
            const post = await axios.get('/api/post');
            setPosts(post.data);
            const renter = await axios.get('/api/user/renter');
            setRenter(renter.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* BANNER */}
            <Banner />

            {/* Search */}
            <div className="flex justify-center -translate-y-8 relative z-10">
                <div className="flex bg-m_main dark:bg-d_main py-4 px-7 space-x-5 items-center rounded-lg">
                    <Search />
                    <DropDown name={category[2]?.name} list={category[2]?.value} />
                    <DropDown name={category[0]?.name} list={category[0]?.value} />
                    <Button btn="primary">Tìm kiếm</Button>
                </div>
            </div>

            {/* Home card */}
            <div className="w-full">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Căn nhà tốt nhất</span>
                    </div>
                    <CardProduct Data={posts?.posts} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline" to="/rent">
                            Xem thêm ...
                        </Button>
                    </div>
                </div>
            </div>

            {/* Renter card */}
            <div className="w-full bg-m_main dark:bg-d_main">
                <div className="p-5 max-w-7xl mx-auto">
                    <div className="mb-5">
                        <span className="text-xl text-primary-default font-semibold">Chủ nhà được ưa thích nhất</span>
                    </div>
                    <CardRenter data={renter} />
                    <div className="flex justify-center items-center mt-7">
                        <Button btn="outline" to="/renter">
                            Xem thêm ...
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
