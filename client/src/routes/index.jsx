import { lazy } from 'react';
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));

const Home = lazy(() => import('../pages/public/Home'));

const HomeManager = lazy(() => import('../pages/system/Home'));
const Manager = lazy(() => import('../pages/system/Manager'));
const Admin = lazy(() => import('../pages/system/Admin'));
const Profile = lazy(() => import('../pages/system/profile'));

export const nav = [
    {
        path: '/',
        name: 'Home',
        element: <Home />,
        isMenu: true,
        isUser: false,
        isManager: false,
        isAdmin: false,
    },
    {
        path: '/login',
        name: 'Login',
        element: <SignIn />,
        isMenu: false,
        isUser: false,
        isManager: false,
        isAdmin: false,
    },
    {
        path: '/register',
        name: 'Register',
        element: <SignUp />,
        isMenu: false,
        isUser: false,
        isManager: false,
        isAdmin: false,
    },
    {
        path: '/user',
        name: 'User',
        element: <Manager />,
        isMenu: true,
        isUser: true,
        isManager: true,
        isAdmin: true,
    },
    {
        path: '/maneger',
        name: 'Maneger',
        element: <HomeManager />,
        isMenu: true,
        isUser: false,
        isManager: true,
        isAdmin: true,
    },
    {
        path: '/admin',
        name: 'Admin',
        element: <Admin />,
        isMenu: true,
        isUser: false,
        isManager: false,
        isAdmin: true,
    },
    {
        path: '/account',
        name: 'Account',
        element: <Profile />,
        isMenu: true,
        isUser: true,
        isManager: true,
        isAdmin: true,
    },
];
