import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-primary-foreground min-h-screen">
            {/* Hero Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
                <Badge className="mb-4">Welcome to YourApp</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                    Build Amazing Things with YourApp
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    YourApp empowers you to create, collaborate, and succeed with intuitive
                    tools designed for everyone.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition" />
                    </Button>
                    <Button size="lg" variant="outline">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    Easy to Use
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    Intuitive interface designed for users of all levels to get
                                    started quickly.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    Scalable
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    Grow your projects with our scalable infrastructure that adapts
                                    to your needs.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    Secure
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    Your data is protected with industry-leading security protocols.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                        What Our Users Say
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base mb-4">
                                    "YourApp has transformed the way we work. It's intuitive and
                                    powerful!"
                                </p>
                                <p className="font-semibold text-sm sm:text-base">– Jane Doe, CEO</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base mb-4">
                                    "The scalability and support are unmatched. Highly recommend!"
                                </p>
                                <p className="font-semibold text-sm sm:text-base">– John Smith, Developer</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;