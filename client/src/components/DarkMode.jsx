import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '~/redux/theme/themeSlice';

function DarkMode() {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    return (
        <>
            <div className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </div>
        </>
    );
}

export default DarkMode;
