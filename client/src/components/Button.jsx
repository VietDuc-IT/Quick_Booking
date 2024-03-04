// export const BtnDefault = ({ name }) => {
//     return (
//         <>
//             <button className="py-2 px-4 text-sm font-semibold bg-primary-default hover:bg-primary-hover text-white transition-all duration-300 rounded">
//                 {name}
//             </button>
//         </>
//     );
// };

// export const BtnDark = ({ name }) => {
//     return (
//         <>
//             <button className="py-2 px-4 text-sm font-semibold bg-black-default hover:bg-black-hover text-white transition-all duration-300 rounded">
//                 {name}
//             </button>
//         </>
//     );
// };

// export const BtnOutline = ({ name }) => {
//     return (
//         <>
//             <button className="py-1.5 px-4 text-sm font-semibold border-primary-default text-primary-default hover:shadow-sm hover:shadow-primary-default cursor-pointer rounded border-2">
//                 {name}
//             </button>
//         </>
//     );
// };
import { Link } from 'react-router-dom';

function Button({ to, href, btn, className, children, onClick, ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = {
        primary:
            'py-2 px-4 text-sm font-semibold bg-primary-default hover:bg-primary-hover text-white transition-all duration-300 rounded',
        outline:
            'py-1.5 px-4 text-sm font-semibold border-primary-default text-primary-default hover:shadow-sm hover:shadow-primary-default cursor-pointer rounded border-2',
        dark: 'py-2 px-4 text-sm font-semibold bg-black-default hover:bg-black-hover text-white transition-all duration-300 rounded',
        round: 'py-2 px-4 rounded-full text-sm font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 rounded',
        default:
            'py-2 px-4 text-sm font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 rounded',
    };

    return (
        <Comp className={`${classes[btn]} ${className}`} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
