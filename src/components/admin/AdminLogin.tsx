"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.ok) {
                // Refresh to trigger re-validation of auth in server components
                router.refresh();
            } else {
                setError("Invalid admin credentials. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
            <Card className="w-full max-w-md p-10 bg-white border border-cream-dark shadow-2xl rounded-4xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-rose" />

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-rose/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-8 h-8 text-rose" />
                    </div>
                    <h1 className="text-3xl font-bold serif text-chocolate mb-2">Admin Portal</h1>
                    <p className="text-chocolate/50 font-medium italic">Secure access for platform administrators.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose/10 border border-rose/20 rounded-xl text-rose text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Admin Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-cream/30 border border-cream-dark rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium"
                                placeholder="admin@showerflour.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Secret Password</label>
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
                        className="w-full h-14 bg-chocolate hover:bg-choco-dark"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Access Dashboard"} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-xs font-bold text-chocolate/40 uppercase tracking-widest hover:text-rose transition-colors"
                    >
                        Back to Public Site
                    </button>
                </div>
            </Card>
        </div>
    );
}
