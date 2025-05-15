import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import {ArrowRight} from "lucide-react";

const Login = () => {
    return (
        <div className="flex items-center justify-center py-20 px-5">
            <Card className="w-full max-w-md border-2 bg-primary-background">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold">Login to YourApp</CardTitle>
                    <p className="text-muted-foreground mt-2">
                        Welcome back! Please sign in to continue.
                    </p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="w-full"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <input type="checkbox" className="h-4 w-4" />
                                <span>Remember me</span>
                            </Label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full group" size="lg">
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                        </Button>
                    </form>
                    <p className="text-center text-muted-foreground mt-6 text-sm">
                        Don’t have an account?{" "}
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