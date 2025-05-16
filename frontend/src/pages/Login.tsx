import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Login failed with status ${response.status}`);
            }

            // Save to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Dispatch custom event to notify NavBar
            window.dispatchEvent(new Event('localStorageChange'));

            toast.success('Đăng nhập thành công!', {
                description: 'Chúc bạn một ngày tốt lành'
            });

            // navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
            navigate('/panel');
        } catch (err) {
            console.error('Fetch error:', err);
            let errorMessage = (err as Error).message || 'An unexpected error occurred.';

            if ((err as Error).name === 'TypeError' && (err as Error).message.includes('Failed to fetch')) {
                errorMessage = 'Unable to connect to the server. Please check if the server is running or try again later.';
            } else if ((err as Error).message.includes('status 404')) {
                errorMessage = 'API endpoint not found. Please verify the server URL.';
            } else if ((err as Error).message.includes('status 401')) {
                errorMessage = 'Invalid email or password.';
            }

            setError(errorMessage);
            toast.error('Đăng nhập thất bại', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6">
            <Card className="w-full sm:max-w-md border-2 bg-primary-background">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl sm:text-3xl font-extrabold">Login to YourApp</CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Welcome back! Please sign in to continue.
                    </p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 sm:h-12"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs sm:text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-10 sm:h-12"
                                disabled={isLoading}
                            />
                        </div>
                        <p className="text-xs text-destructive">
                            {error?.trim() || '\u00A0'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <Label className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    disabled={isLoading}
                                />
                                <span>Remember me</span>
                            </Label>
                            <Link
                                to="/forgot-password"
                                className="text-xs sm:text-sm text-primary hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="w-full group h-10 sm:h-12"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition" />
                                </>
                            )}
                        </Button>
                    </form>
                    <p className="text-center text-muted-foreground mt-4 sm:mt-6 text-xs sm:text-sm">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;