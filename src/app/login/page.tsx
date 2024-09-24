"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // muttation to post login data

    const mutation = useMutation({
        mutationFn: async (loginData:{email:string, password:string}) =>{
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
            if (!response.ok) {
                throw new Error("Failed to register");
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Registration successful", data);
        },
        onError: (error) => {
            console.error("Error registering:", error);
        },
    })

    const handleEmailChange = (event: { target: { value: SetStateAction<string> } }) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        mutation.mutate({
            email,
            password
        })
    
    };

    return (
        <div className="w-screen h-screen bg-red-200 flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in to account</CardTitle>
                    <CardDescription>Don't have an account? Sign up for an account now.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter a valid Email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-4">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit">Login</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
