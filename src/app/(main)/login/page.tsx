"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRegistered = searchParams.get("registered");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const normalizedEmail = email.toLowerCase().trim();
            const result = await signIn("credentials", {
                email: normalizedEmail,
                password,
                redirect: false,
            });

            if (result?.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            console.error("Sign-in error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
            <Card className="w-full max-w-md p-10 bg-white border border-cream-dark shadow-2xl rounded-4xl">
                <div className="text-center mb-10">
                    <div className="text-5xl mb-6">🎂</div>
                    <h1 className="text-3xl font-bold serif text-chocolate mb-2">Welcome Back</h1>
                    <p className="text-chocolate/50 font-medium italic">Your baking journey continues here.</p>
                </div>

                {(isRegistered || error) && (
                    <div className={cn(
                        "mb-6 p-4 rounded-xl text-sm font-medium text-center border",
                        error ? "bg-rose/10 border-rose/20 text-rose" : "bg-green-50 border-green-200 text-green-700"
                    )}>
                        {error || "Account created successfully! Please sign in."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                placeholder="you@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-chocolate text-white rounded-full font-bold shadow-lg hover:bg-choco-dark transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                            </div>
                        )}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-chocolate/40">
                    First time here? <Link href="/register" className="text-rose font-bold hover:underline">Create an account</Link>
                </p>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-rose animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
