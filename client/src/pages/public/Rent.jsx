import axios from '~/ultils/axios';
import React, { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Cards from '~/components/public/CardProduct';
import FilterTop from '~/components/public/FilterTop';
import Suggest from '~/components/public/Suggest';
import Evaluate from '~/components/public/Evaluate';
import { useLocation, useNavigate } from 'react-router-dom';

function Product() {
    const [filterData, setFilterData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [data, setData] = useState();
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTremFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTremFromUrl) {
            setFilterData({
                ...filterData,
                searchTerm: searchTremFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }

        const fetchPosts = async () => {
            const searchQuery = urlParams.toString();
            const res = await axios.get(`/api/post?${searchQuery}`);
            setData(res.data);
            if (res?.data.posts.length === 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = ({ id, value }) => {
        if (id === 'searchTerm') {
            setFilterData({ ...filterData, searchTerm: value });
        }
        if (id === 'sort') {
            const sort = value || 'desc';
            setFilterData({ ...filterData, sort });
        }
        if (id === 'category') {
            const category = value || 'uncategorized';
            setFilterData({ ...filterData, category });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', filterData.searchTerm);
        urlParams.set('sort', filterData.sort);
        urlParams.set('category', filterData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = data.posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await axios.get(`/api/post?${searchQuery}`);
        setData(res.data);
        if (res?.data.posts.length === 8) {
            setShowMore(true);
        } else {
            setShowMore(false);
        }
    };

    return (
        <>
            {/* Filter Top */}
            <FilterTop />

            {/* Suggest */}
            <Suggest />

            {/* Card Product */}
            <div className="w-full">
                <div className="p-5 max-w-7xl mx-auto">
                    <Cards Data={data?.posts} />
                    <div className="flex justify-center items-center mt-7">
                        {showMore && (
                            <Button onClick={handleShowMore} btn="outline">
                                Xem thêm ...
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Evaluate */}
            <Evaluate />
        </>
    );
}

export default Product;
