const Footer = () => {
    return (
        <footer className="py-8 px-5 bg-muted border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-muted-foreground">
                    © 2025 YourApp. All rights reserved.
                </p>
                <nav className="mt-4 md:mt-0 space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        Terms of Service
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        Contact Us
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;