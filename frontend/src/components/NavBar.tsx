import { ModeToggle } from "./mode-toggle";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header className="p-5 flex items-center justify-between border-b bg-primary-foreground">
            <span className="text-2xl font-bold">Test-Website</span>

            <nav className="flex items-center space-x-4">
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
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            </nav>
        </header>
    );
};

export default NavBar;