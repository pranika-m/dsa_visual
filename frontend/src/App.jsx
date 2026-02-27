import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import TopicListPage from './pages/TopicListPage';
import EditorialPage from './pages/EditorialPage';

function App() {
    const location = useLocation();
    const [sandboxOpen, setSandboxOpen] = useState(false);

    useEffect(() => {
        if (!location.pathname.startsWith('/learn/')) {
            setSandboxOpen(false);
        }
    }, [location.pathname]);

    return (
        <div className="app">
            <Navbar onToggleSandbox={() => setSandboxOpen((prev) => !prev)} />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/topics/:slug" element={<TopicListPage />} />
                    <Route
                        path="/learn/:slug"
                        element={
                            <EditorialPage
                                sandboxOpen={sandboxOpen}
                                onCloseSandbox={() => setSandboxOpen(false)}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;
