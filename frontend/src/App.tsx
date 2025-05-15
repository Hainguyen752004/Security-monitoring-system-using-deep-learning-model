import './App.css';
import NavBar from './components/NavBar';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';



function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen">
                <NavBar />

                <main className="flex-grow bg-primary-foreground">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        {/* Optional: Add a 404 route */}
                        <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;