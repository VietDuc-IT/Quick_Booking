import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className="bg-white text-m_text dark:bg-d_body dark:text-d_text min-h-screen">{children}</div>
        </div>
    );
}
