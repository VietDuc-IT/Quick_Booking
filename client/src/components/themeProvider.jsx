import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className="text-m_text bg-m_body dark:bg-d_body dark:text-d_text min-h-screen">{children}</div>
        </div>
    );
}
