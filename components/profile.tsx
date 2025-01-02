'use client'

import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout";

type ProfileContentProps = {
    profilePicture: string | null;
    firstName: string;
    lastName: string;
    email: string | null;
};

export function ProfileContent({ profilePicture, firstName, lastName, email }: ProfileContentProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const fullName = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`;

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={profilePicture || undefined} alt={fullName} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">Hi, {firstName}</h1>
            <p className="text-gray-600">Email: {email || 'johndoe@gmail.com'}</p>
            <LogoutButton />
        </div>
    );
}

