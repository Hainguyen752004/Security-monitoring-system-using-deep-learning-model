import { ModeToggle } from "./mode-toggle";
import { Button } from "../components/ui/button"; // Importing button from ShadCN UI

const NavBar = () => {
    return (
        <div className="bg-accent min-w-full text-accent-foreground p-5 flex items-center justify-between">
            <span className="text-xl font-bold">Test-Website</span>

            <div className="flex items-center space-x-4">

                <ModeToggle/>
                <Button className={"bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent border-2"}>Login</Button>
            </div>
        </div>
    );
};

export default NavBar;
