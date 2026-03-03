import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { User, Mail, Shield, Calendar, Settings } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <div className="pt-32 pb-24 bg-cream min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12">
                    <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Your Information</span>
                    <h1 className="text-5xl font-bold serif text-chocolate">My Profile</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Quick Actions */}
                    <div className="md:col-span-1 space-y-6">
                        <Card className="border border-cream-dark bg-white shadow-sm overflow-hidden">
                            <div className="aspect-square bg-rose/10 flex items-center justify-center">
                                <User className="w-20 h-20 text-rose" />
                            </div>
                            <CardContent className="p-6 text-center">
                                <h2 className="text-xl font-bold serif text-chocolate mb-1">{user.name}</h2>
                                <p className="text-sm text-chocolate/50 font-medium uppercase tracking-widest">{(user as { role?: string }).role || "Student"}</p>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-3">
                            <LogoutButton />
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="border border-cream-dark bg-white shadow-sm">
                            <CardHeader className="border-b border-cream-dark/50 pb-6">
                                <CardTitle className="serif text-2xl text-chocolate flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-rose" />
                                    Account Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest flex items-center gap-2">
                                            <User className="w-3 h-3" /> Full Name
                                        </p>
                                        <p className="text-lg font-medium text-chocolate italic">{user.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> Email Address
                                        </p>
                                        <p className="text-lg font-medium text-chocolate italic">{user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Role
                                        </p>
                                        <p className="text-lg font-medium text-chocolate italic capitalize">{(user as { role?: string }).role?.toLowerCase() || "student"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest flex items-center gap-2">
                                            📲 Mobile Number
                                        </p>
                                        <p className="text-lg font-medium text-chocolate italic">{(user as { phone?: string }).phone || "Not provided"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> Member Since
                                        </p>
                                        <p className="text-lg font-medium text-chocolate italic">February 2026</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-cream-dark bg-white/50 border-dashed">
                            <CardContent className="p-8 text-center py-12">
                                <Settings className="w-12 h-12 text-chocolate/20 mx-auto mb-4" />
                                <h3 className="text-xl font-bold serif text-chocolate/60">Advanced Settings</h3>
                                <p className="text-sm text-chocolate/40 max-w-xs mx-auto mt-2">
                                    Account preferences and security settings will be available in the next update.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
