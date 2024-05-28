import { useState } from 'react';

function Select({ data, onSelect }) {
    const [valueSelect, setValueSelect] = useState('');

    const handleSelect = (e) => {
        onSelect(e.target.value);
    };

    return (
        <>
            <form className="max-w-sm mx-auto">
                <label for="underline_select" className="sr-only">
                    Underline select
                </label>
                <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    onChange={handleSelect}
                >
                    <option selected>-- Chọn {data?.name} --</option>
                    {/*  */}
                    {data?.value.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>
            </form>
        </>
    );
}

export default Select;
