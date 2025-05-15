import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, Star, CheckCircle } from "lucide-react";

const Home = () => {
    return (
        <div className="bg-primary-foreground min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-5 text-center">
                <Badge className="mb-4">Welcome to YourApp</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Build Amazing Things with YourApp
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    YourApp empowers you to create, collaborate, and succeed with intuitive
                    tools designed for everyone.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                    </Button>
                    <Button size="lg" variant="outline">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-5 bg-muted">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">Our Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    Easy to Use
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Intuitive interface designed for users of all levels to get
                                    started quickly.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    Scalable
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Grow your projects with our scalable infrastructure that adapts
                                    to your needs.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    Secure
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Your data is protected with industry-leading security protocols.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-5">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        What Our Users Say
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    "YourApp has transformed the way we work. It's intuitive and
                                    powerful!"
                                </p>
                                <p className="font-semibold">– Jane Doe, CEO</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    "The scalability and support are unmatched. Highly recommend!"
                                </p>
                                <p className="font-semibold">– John Smith, Developer</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;