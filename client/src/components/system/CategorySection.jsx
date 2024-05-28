import { MdOutlineAddHomeWork, MdOutlineBedroomParent, MdOutlineChair, MdOutlineMapsHomeWork } from 'react-icons/md';
import { PiSelectionBackgroundBold, PiToilet } from 'react-icons/pi';
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';
import { RiHomeGearLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from '~/ultils/axios';
import Select from '../Select';

function CategorySection({ onListValue }) {
    const [category, setCategory] = useState([]);
    const [listValue, setListValue] = useState([]);

    const fetchData = async () => {
        const res = await axios.get('/api/category');
        setCategory(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        onListValue(listValue);
    }, [listValue]);

    const categoryItem1 = [
        { icon: PiSelectionBackgroundBold, name: category[3], list: category[3] },
        { icon: FaArrowsAltH, name: category[4], list: category[4] },
        { icon: FaArrowsAltV, name: category[5], list: category[5] },
        { icon: MdOutlineChair, name: category[6], list: category[6] },
    ];
    const categoryItem2 = [
        { icon: RiHomeGearLine, name: category[7], list: category[7] },
        { icon: MdOutlineBedroomParent, name: category[1], list: category[1] },
        { icon: PiToilet, name: category[8], list: category[8] },
        { icon: MdOutlineAddHomeWork, name: category[9], list: category[9] },
    ];

    const handleSelect = (value) => {
        setListValue([...listValue, value]);
    };

    return (
        <div className="mb-6">
            <div className="grid grid-cols-2">
                <div className="flex items-center space-x-3 rtl:space-x-reverse col-span-2 my-4">
                    <MdOutlineMapsHomeWork className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Cho Thuê</span>
                </div>
                <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-nowrap">
                    {categoryItem1.map((item) => (
                        <li className="flex items-center space-x-3 rtl:space-x-reverse" key={item.id}>
                            <item.icon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                            <div className="flex items-center space-x-3">
                                <span className="font-semibold text-gray-900 dark:text-white">{item.name?.name} </span>
                                {/* Dropdown */}
                                <Select data={item.list} onSelect={handleSelect} />;
                            </div>
                        </li>
                    ))}
                </ul>
                <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 text-nowrap">
                    {categoryItem2.map((item) => (
                        <li className="flex items-center space-x-3 rtl:space-x-reverse" key={item.id}>
                            <item.icon className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />

                            <div className="flex items-center space-x-3">
                                <span className="font-semibold text-gray-900 dark:text-white">{item.name?.name} </span>
                                {/* Dropdown */}
                                <Select data={item.list} onSelect={handleSelect} />;
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategorySection;
