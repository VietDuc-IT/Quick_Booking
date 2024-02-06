import './App.css';
import { lazy, useEffect, useState } from 'react';
import { Authentication } from './authentication';

import Loader from './common/Loader';

const DefaultLayout = lazy(() => import('./layout/LayoutPublic'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Authentication />
        </>
    );
}

export default App;
