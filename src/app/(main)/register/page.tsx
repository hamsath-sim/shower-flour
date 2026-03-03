"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await registerUser({ name, email, password, phone });
            if (result.success) {
                router.push("/login?registered=true");
            } else {
                setError(result.error || "Registration failed. Please try again.");
            }
        } catch (_err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6 pb-12 pt-12">
            <Card className="w-full max-w-md p-10 bg-white border border-cream-dark shadow-2xl rounded-4xl">
                <div className="text-center mb-10">
                    <div className="text-5xl mb-6">🎂</div>
                    <h1 className="text-3xl font-bold serif text-chocolate mb-2">Join Shower Flour</h1>
                    <p className="text-chocolate/50 font-medium italic">Start your premium baking journey today.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose/10 border border-rose/20 rounded-xl text-rose text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                    </div>

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
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Mobile Number</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/30 text-xs font-bold">📲</div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                placeholder="+91 00000 00000"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Confirm</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full h-14 bg-chocolate hover:bg-choco-dark text-white rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>Create Account <ArrowRight className="w-4 h-4 ml-2" /></>
                        )}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-chocolate/40">
                    Already have an account?{" "}
                    <Link href="/login" className="text-rose font-bold hover:underline">
                        Sign In
                    </Link>
                </p>
            </Card>
        </div>
    );
}
