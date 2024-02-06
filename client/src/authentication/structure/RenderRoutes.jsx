import { Route, Routes } from 'react-router-dom';
import { AuthData } from '../index';
import { nav } from '~/routes';

export const RenderRoutes = () => {
    const { user } = AuthData();

    return (
        <Routes>
            {nav.map((route, index) => {
                if (route.isAdmin && user.isAuthenticated && user.role === 'admin') {
                    return <Route key={index} path={route.path} element={route.element} />;
                } else if (route.isManager && user.isAuthenticated && user.role === 'manager') {
                    return <Route key={index} path={route.path} element={route.element} />;
                } else if (route.isUser && user.isAuthenticated && user.role === 'user') {
                    return <Route key={index} path={route.path} element={route.element} />;
                } else if (!route.isAdmin) {
                    return <Route key={index} path={route.path} element={route.element} />;
                } else return false;
            })}
        </Routes>
    );
};

// export const RenderMenu = () => {
//     const { user, logout } = AuthData();

//     const MenuItem = ({ route }) => {
//         return (
//             <div className="menuItem">
//                 <Link to={route.path}>{route.name}</Link>
//             </div>
//         );
//     };
//     return (
//         <div className="menu">
//             {nav.map((route, index) => {
//                 if (!route.isAdmin && route.isMenu) {
//                     return <MenuItem key={index} route={route} />;
//                 } else if (user.isAuthenticated && route.isMenu) {
//                     return <MenuItem key={index} route={route} />;
//                 } else return false;
//             })}

//             {user.isAuthenticated ? (
//                 <div className="menuItem">
//                     <Link to={'#'} onClick={logout}>
//                         Log out
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="menuItem">
//                     <Link to={'login'}>Log in</Link>
//                 </div>
//             )}
//         </div>
//     );
// };
