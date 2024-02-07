import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from './common/Loader';
import Home from './pages/public/Home';
import routes from './routes';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
const DefaultLayout = lazy(() => import('./layout/LayoutPublic'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    {routes.map((routes, index) => {
                        const { path, component: Component } = routes;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        );
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
