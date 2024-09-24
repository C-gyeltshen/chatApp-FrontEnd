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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mutation to send POST request
  const mutation = useMutation({
    mutationFn: async (userData: { name: string; email: string; password: string }) => {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

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
  });

  const handleNameChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: string } }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
    // Trigger the mutation
    mutation.mutate({
      name,
      email,
      password,
    });
  };

  return (
    <div className="w-screen h-screen bg-red-200 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardDescription>Already registered? Log in to your account now.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  id="name"
                  placeholder="Enter your good name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  id="email"
                  placeholder="Enter a valid email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  id="password"
                  placeholder="Create a password"
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">Register</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
