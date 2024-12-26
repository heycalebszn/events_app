'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ChromeIcon from "@/components/icons/chrome"
import { GithubIcon } from "@/components/icons/github"
import { FingerprintIcon } from "@/components/icons/fingerprint"
import Image from "next/image"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome</h1>
                                <p className="text-balance text-muted-foreground">
                                    Enter your email to continue to Events Palour
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Continue with Email
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="w-full p-0">
                                                <GithubIcon />
                                                <span className="sr-only"> GitHub</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="hidden lg:block">
                                            GitHub
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="w-full p-0">
                                                <ChromeIcon />
                                                <span className="sr-only"> Google</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="hidden lg:block">
                                            Google
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="w-full p-0">
                                                <FingerprintIcon />
                                                <span className="sr-only"> Passkeys</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="hidden lg:block">
                                            Passkeys
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/images/login.svg"
                            alt="auth illustration"
                            fill
                            priority
                            className="object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm