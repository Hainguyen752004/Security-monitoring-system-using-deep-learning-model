import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-muted border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm sm:text-base">
                    © 2025 YourApp. All rights reserved.
                </p>
                <nav className="flex flex-col md:flex-row mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
                    <Link to="/privacy" className="text-muted-foreground text-sm sm:text-base hover:text-primary">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-muted-foreground text-sm sm:text-base hover:text-primary">
                        Terms of Service
                    </Link>
                    <Link to="/contact" className="text-muted-foreground text-sm sm:text-base hover:text-primary">
                        Contact Us
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;