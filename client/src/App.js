import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from './layout/default.layout';
import SystemLayout from './layout/system.layout';
import PrivateRoute from './ultils/setRoute/PrivateRoute';
import SystemRoute from './ultils/setRoute/SystemRoute';
import AdminRoute from './ultils/setRoute/AdminRote';
import NotFound from './common/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import RefreshPass from './pages/RefreshPass';

// ============ Public =============
import Home from './pages/public/Home';
import Rent from './pages/public/Rent';
import About from './pages/public/About';
import Infor from './pages/public/Infor';

// ============ Private =============
import Dashboard from './pages/system/Dashboard';
import User from './pages/system/User';
import CreatePost from './pages/system/CreatePost';
import Posts from './pages/system/Posts';
import UpdatePost from './pages/system/UpdatePost';
import Profile from './pages/system/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPass />} />
                <Route path="/refresh-password/:id" element={<RefreshPass />} />
                <Route path="*" element={<NotFound />} />

                {/* DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/about" element={<About />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/infor/:id" element={<Infor />} />
                        <Route path="/history/:id" element="" />
                    </Route>
                </Route>

                {/* SystemLayout */}
                <Route element={<SystemRoute />}>
                    <Route element={<SystemLayout />}>
                        <Route element={<AdminRoute />}>
                            <Route path="/user" element={<User />} />
                        </Route>

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/update-post/:postId" element={<UpdatePost />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
