import { ModeToggle } from "./mode-toggle";
import { Button } from "../components/ui/button";
import {Link} from "react-router-dom"; // Importing button from ShadCN UI

const NavBar = () => {
    return (
        <div className="bg-accent min-w-full text-accent-foreground p-5 flex items-center justify-between">
            <span className="text-xl font-bold">Test-Website</span>

            <div className="flex items-center space-x-4">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <ModeToggle/>
                <Link to={"/login"}><Button className={"bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent border-2"}>Login</Button></Link>
            </div>
        </div>
    );
};

export default NavBar;
