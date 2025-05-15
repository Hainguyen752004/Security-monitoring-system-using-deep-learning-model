import './App.css';
import NavBar from './components/NavBar';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import { Toaster } from 'sonner';
import Pricing from "./pages/Pricing.tsx";
import Panel from "./pages/Panel.tsx";

// Placeholder components for missing routes
const Contact = () => <div className="text-center py-10">Contact Page (Under Construction)</div>;
const Signup = () => <div className="text-center py-10">Sign Up Page (Under Construction)</div>;
const ForgotPassword = () => <div className="text-center py-10">Forgot Password Page (Under Construction)</div>;
const Admin = () => <div className="text-center py-10">Admin Dashboard (Under Construction)</div>;
const Dashboard = () => <div className="text-center py-10">User Dashboard (Under Construction)</div>;

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-grow bg-primary-foreground px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/panel" element={<Panel />} />
                        <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
            <Toaster
                toastOptions={{
                    className: 'text-red-600 dark:text-red-400', // Theme-aware color
                }}
            />
        </ThemeProvider>
    );
}

export default App;