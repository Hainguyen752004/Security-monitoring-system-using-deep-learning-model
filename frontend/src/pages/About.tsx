import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-primary-foreground min-h-screen">
            {/* Hero Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center bg-primary-foreground">
                <Badge variant="outline" className="mb-4 border-primary text-primary">
                    About YourApp
                </Badge>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-primary">
                    About YourApp
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    We build tools to empower creators and connect teams worldwide.
                </p>
                <Separator className="my-6 max-w-md mx-auto bg-primary/20" />
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Link to="/contact">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 px-6 py-3 text-base">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-48 text-sm">
                            Connect with our team for support or inquiries.
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button size="lg" variant="outline" className="hover:bg-primary/10 px-6 py-3 text-base">
                                Our Vision
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-48 text-sm">
                            Discover our commitment to innovation.
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-8 sm:mb-12">
                        <Badge className="bg-primary text-primary-foreground">Our Mission</Badge>
                        <h3 className="text-2xl sm:text-3xl font-bold">What Drives Us</h3>
                    </div>
                    <ScrollArea className="w-full">
                        <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 sm:gap-8 pb-4">
                            {[
                                {
                                    title: 'Global Impact',
                                    desc: 'Inspiring creativity worldwide with accessible and innovative tools.',
                                },
                                {
                                    title: 'Seamless Collaboration',
                                    desc: 'Connecting teams to build meaningful projects, anywhere, anytime.',
                                },
                                {
                                    title: 'User Success',
                                    desc: 'Tailoring scalable solutions to help you achieve your goals.',
                                },
                            ].map((mission, index) => (
                                <Card
                                    key={index}
                                    className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl min-w-[250px] lg:min-w-0"
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Globe className="h-5 sm:h-6 w-5 sm:w-6 text-primary animate-spin-slow" />
                                            {mission.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <p className="text-muted-foreground text-sm sm:text-base">{mission.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {[
                            {
                                name: 'Jane Doe',
                                role: 'Co-Founder & CEO',
                                desc: 'Leading YourApp with a vision to empower creators since 2020.',
                                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80',
                                initials: 'JD',
                            },
                            {
                                name: 'John Smith',
                                role: 'CTO',
                                desc: 'Driving innovation with scalable and secure solutions.',
                                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80',
                                initials: 'JS',
                            },
                        ].map((member, index) => (
                            <HoverCard key={index}>
                                <HoverCardTrigger asChild>
                                    <Card className="flex flex-col sm:flex-row items-center p-4 sm:p-6 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <Avatar className="w-32 h-48 sm:w-36 sm:h-54 mb-4 sm:mb-0 sm:mr-6 rounded-lg overflow-hidden">
                                            <AvatarImage
                                                src={member.img}
                                                alt={member.name}
                                                className="object-cover w-full h-full"
                                            />
                                            <AvatarFallback className="text-3xl font-bold bg-primary/20">
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <CardContent className="flex-1 text-center sm:text-left">
                                            <p className="font-semibold text-base sm:text-lg mb-1">{member.name}</p>
                                            <p className="text-muted-foreground text-sm sm:text-base mb-2">{member.role}</p>
                                            <Separator className="my-2 bg-primary/20" />
                                            <p className="text-muted-foreground text-xs sm:text-sm">{member.desc}</p>
                                        </CardContent>
                                    </Card>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-64 text-sm">
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-muted-foreground">{member.role}</p>
                                    <p className="mt-2">{member.desc}</p>
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;