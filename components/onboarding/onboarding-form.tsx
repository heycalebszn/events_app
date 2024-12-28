'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ImagePlus, Users, Building2, Loader2 } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Organization Details",
        icon: Building2,
        description: "Tell us about your organization"
    },
    {
        id: 2,
        title: "Customize Your Profile",
        icon: ImagePlus,
        description: "Add your branding"
    },
    {
        id: 3,
        title: "Invite Your Team",
        icon: Users,
        description: "Build your team"
    }
];

const OnboardingFlow = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const totalSteps = steps.length;
    const currentStep = steps.find(s => s.id === step);

    const handleComplete = async () => {
        if (step === totalSteps) {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push('/dashboard/organizer');
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="w-full relative">
            <Progress value={(step / totalSteps) * 100} className="mb-8 h-2" />

            <Card className="w-full">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        {currentStep && <currentStep.icon className="h-5 w-5" />}
                        <CardTitle className="text-xl">{currentStep?.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {currentStep?.description}
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="orgName">Organization Name</Label>
                                <Input
                                    id="orgName"
                                    placeholder="Enter organization name"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Tell us about your organization"
                                    className="min-h-[120px] resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                    id="website"
                                    placeholder="https://your-website.com"
                                    className="h-11"
                                />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                                <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                                <Label
                                    htmlFor="logo"
                                    className="mt-4 block font-medium cursor-pointer"
                                >
                                    Upload Logo
                                    <span className="block text-sm text-muted-foreground mt-1">
                                        Drag and drop or click to upload
                                    </span>
                                </Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Invite Team Members</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Enter email address"
                                        className="h-11"
                                    />
                                    <Button size="lg">
                                        Send Invite
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    You can always invite more team members later
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between pt-6">
                    <Button
                        variant="outline"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1 || isLoading}
                        size="lg"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleComplete}
                        disabled={isLoading}
                        size="lg"
                        className="min-w-[120px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Setting up...
                            </>
                        ) : (
                            step === totalSteps ? 'Complete Setup' : 'Next Step'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OnboardingFlow;