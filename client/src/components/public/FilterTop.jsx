import DropDown from '../DropDown';
import Search from '../Search';
import { FaFilter } from 'react-icons/fa';
import { BiSolidMapPin } from 'react-icons/bi';
import Button from '../Button';
import axios from '~/ultils/axios';
import { useEffect, useState } from 'react';

function FilterTop() {
    const [category, setCategory] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/category');
            setCategory(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="bg-gradient-to-t from-black-default to-primary-default">
                <div className="max-w-7xl mx-auto px-5 py-3">
                    {/* relative overflow-x-auto */}
                    <div className="flex items-center flex-row gap-4 text-nowrap relative overflow-x-auto">
                        <Button btn="default" className="flex">
                            <FaFilter className="mr-2 translate-y-0.5" /> Bộ lọc
                        </Button>
                        <Button btn="default" className="flex">
                            <BiSolidMapPin className="mr-2 translate-y-0.5" /> Gần tôi
                        </Button>
                        <Search />
                        {/* ==================================== */}
                        {category?.map((item) => (
                            <DropDown name={item.name} list={item.value} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterTop;
