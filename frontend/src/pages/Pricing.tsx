import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Check, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            description: 'Perfect for getting started',
            features: [
                'Basic features',
                'Up to 5 projects',
                'Community support',
                'Limited storage (1GB)',
            ],
            cta: 'Get Started',
            ctaLink: '/signup',
            variant: 'outline',
        },
        {
            name: 'Basic',
            price: '$9.99/mo',
            description: 'Ideal for small teams',
            features: [
                'All Free features',
                'Up to 20 projects',
                'Email support',
                '5GB storage',
                'Custom branding',
            ],
            cta: 'Choose Basic',
            ctaLink: '/signup',
            variant: 'default',
            highlighted: true,
        },
        {
            name: 'Pro',
            price: '$19.99/mo',
            description: 'For growing businesses',
            features: [
                'All Basic features',
                'Unlimited projects',
                'Priority support',
                '20GB storage',
                'Advanced analytics',
                'Team collaboration tools',
            ],
            cta: 'Choose Pro',
            ctaLink: '/signup',
            variant: 'default',
        },
    ];

    const faqs = [
        {
            question: 'What is included in the Free plan?',
            answer: 'The Free plan includes basic features, up to 5 projects, community support, and 1GB of storage.',
        },
        {
            question: 'Can I upgrade or downgrade my plan later?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings.',
        },
        {
            question: 'Is there a trial period for paid plans?',
            answer: 'We offer a 14-day free trial for the Basic and Pro plans, no credit card required.',
        },
    ];

    return (
        <div className="bg-primary-foreground min-h-screen">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-primary-foreground">
                <Badge variant="outline" className="mb-4 border-primary text-primary">
                    Pricing Plans
                </Badge>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-primary">
                    Choose Your Plan
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Find the perfect plan for your needs, from free to premium features.
                </p>
                <Separator className="max-w-md mx-auto bg-primary/20" />
            </section>

            {/* Pricing Plans Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-primary-foreground">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`border-2 border-white/40 shadow-lg ${
                                    plan.highlighted ? 'ring-2 ring-primary' : ''
                                } hover:shadow-xl transition-shadow duration-300 rounded-2xl`}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="text-xl sm:text-2xl font-bold">{plan.name}</span>
                                        {plan.highlighted && (
                                            <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                                        )}
                                    </CardTitle>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-primary">
                                        {plan.price}
                                    </div>
                                    <p className="text-sm sm:text-base text-muted-foreground">{plan.description}</p>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <ul className="space-y-2 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                                                <Check className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Link to={plan.ctaLink}>
                                                <Button
                                                    size="lg"
                                                    variant={plan.variant}
                                                    className="w-full px-6 py-3 text-base"
                                                >
                                                    {plan.cta}
                                                </Button>
                                            </Link>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-48 text-sm">
                                            Start with the {plan.name} plan today!
                                        </HoverCardContent>
                                    </HoverCard>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="border-none shadow-md">
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-start gap-2">
                                        <HelpCircle className="h-5 sm:h-6 w-5 sm:w-6 text-primary mt-1" />
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base">{faq.question}</p>
                                            <p className="text-muted-foreground text-sm sm:text-base mt-1">{faq.answer}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;