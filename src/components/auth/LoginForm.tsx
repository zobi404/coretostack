"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// In a real app, this would use react-hook-form and Zod for validation
export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock authentication logic
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    
    // In a real app, you would call Firebase Auth here.
    if (email === "admin@pixelglint.com" && password === "password") {
      toast({
        title: "Login Successful",
        description: "Redirecting to admin dashboard...",
      });
      // Mock session/token storage
      localStorage.setItem("user-authenticated", "true");
      router.push("/admin");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="admin@pixelglint.com" defaultValue="admin@pixelglint.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" defaultValue="password" required />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
