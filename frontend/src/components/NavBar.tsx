import { useState, useEffect } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from "./ui/button.tsx";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Function to load user from localStorage
    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    // Load user on mount and listen for storage changes
    useEffect(() => {
        // Initial load
        loadUserFromStorage();

        // Listen for storage events
        const handleStorageChange = (event: { key: string | null; }) => {
            if (event.key === 'user' || event.key === null) {
                loadUserFromStorage();
            }
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Custom event listener for same-tab updates
        const handleCustomStorageChange = () => loadUserFromStorage();
        window.addEventListener('localStorageChange', handleCustomStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localStorageChange', handleCustomStorageChange);
        };
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsOpen(false);
        // Dispatch custom event to notify same-tab components
        window.dispatchEvent(new Event('localStorageChange'));
    };

    return (
        <header className="p-4 sm:p-5 flex items-center justify-between border-b bg-primary-foreground">
            <span className="text-xl sm:text-2xl font-bold">Test-Website</span>

            {/* Hamburger Icon for Mobile */}
            <button
                className="md:hidden text-foreground"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
                <Link to="/">
                    <Button variant="ghost">Home</Button>
                </Link>
                <Link to="/about">
                    <Button variant="ghost">About</Button>
                </Link>
                <Link to="/pricing">
                    <Button variant="ghost">Pricing</Button>
                </Link>
                <Link to="/contact">
                    <Button variant="ghost">Contact</Button>
                </Link>
                <ModeToggle />
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{user.name}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>*/}
                            {/*<DropdownMenuSeparator />*/}
                            <DropdownMenuItem asChild>
                                <Link to="/settings">Cài đặt tài khoản</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                )}
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <nav className="absolute top-[72px] left-0 w-full bg-primary-foreground border-b md:hidden flex flex-col items-center space-y-2 py-4">
                    <Link to="/" onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full text-center">Home</Button>
                    </Link>
                    <Link to="/about" onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full text-center">About</Button>
                    </Link>
                    <Link to="/pricing" onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full text-center">Pricing</Button>
                    </Link>
                    <Link to="/contact" onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full text-center">Contact</Button>
                    </Link>
                    <div className="py-2">
                        <ModeToggle />
                    </div>
                    {user ? (
                        <>
                            <Link to="/profile" onClick={toggleMenu}>
                                <Button variant="ghost" className="w-full text-center">Profile</Button>
                            </Link>
                            <Button variant="outline" className="w-full" onClick={handleLogout}>
                                Logout ({user.name})
                            </Button>
                        </>
                    ) : (
                        <Link to="/login" onClick={toggleMenu}>
                            <Button className="w-full">Login</Button>
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
};

export default NavBar;