import { lazy } from 'react';

const HomeManager = lazy(() => import('../pages/system/Home'));
const Manager = lazy(() => import('../pages/system/Manager'));
const Admin = lazy(() => import('../pages/system/Admin'));
const Profile = lazy(() => import('../pages/system/profile'));
const Component = lazy(() => import('~/components/component'));

const coreRoutes = [
    {
        path: '/system/home',
        title: 'Home',
        component: HomeManager,
    },
    {
        path: '/profile',
        title: 'Profile',
        component: Profile,
    },
    {
        path: '/system/manager',
        title: 'Manager',
        component: Manager,
    },
    {
        path: '/system/admin',
        title: 'Admin',
        component: Admin,
    },
    {
        path: '/component',
        title: 'Compo',
        component: Component,
    },
];

const routes = [...coreRoutes];
export default routes;
