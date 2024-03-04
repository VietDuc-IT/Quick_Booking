import DropDown from '../DropDown';
import Search from '../Search';
import { FaFilter } from 'react-icons/fa';
import { BiSolidMapPin } from 'react-icons/bi';
import Button from '../Button';

function FilterTop() {
    return (
        <>
            <div className="bg-gradient-to-t from-black-default to-primary-default">
                <div className="max-w-7xl mx-auto px-5 py-3">
                    <div className="flex items-center flex-row gap-4 relative overflow-x-auto text-nowrap">
                        <Button btn="default" className="flex">
                            <FaFilter className="mr-2 translate-y-0.5" /> Bộ lọc
                        </Button>
                        <Button btn="default" className="flex">
                            <BiSolidMapPin className="mr-2 translate-y-0.5" /> Gần tôi
                        </Button>
                        <Search />
                        <DropDown name="Vị trí" />
                        <DropDown name="Mức giá" />
                        <DropDown name="Diện tích" />
                        <DropDown name="Phòng ngủ" />
                        <DropDown name="Tình trạng nội thất" />
                        <DropDown name="Hướng cửa chính" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterTop;
