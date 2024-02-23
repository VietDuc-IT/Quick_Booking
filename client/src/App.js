import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layout/default.layout';
import SystemLayout from './layout/system.layout';
import PrivateRoute from './setRoute/PrivateRoute';
import AdminRoute from './setRoute/AdminRote';
import NotFound from './common/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// ============ Public =============
import Home from './pages/public/Home';
import Rent from './pages/public/Rent';
import About from './pages/public/About';

// ============ Private =============
import Dashboard from './pages/system/Dashboard';
import User from './pages/system/User';
import PostNew from './pages/system/PostNew';
import News from './pages/system/News';
import Profile from './pages/system/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />

                {/* DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* SystemLayout */}
                <Route element={<PrivateRoute />}>
                    <Route element={<SystemLayout />}>
                        <Route element={<AdminRoute />}>
                            <Route path="/user" element={<User />} />
                        </Route>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/postnew" element={<PostNew />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
