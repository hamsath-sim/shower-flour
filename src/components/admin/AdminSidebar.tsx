"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CalendarClock,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight,
    ChefHat,
    History,
    CreditCard,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navGroups = [
    {
        label: "Platform Insights",
        items: [
            { title: "Analytics Overview", icon: LayoutDashboard, href: "/admin" },
        ]
    },
    {
        label: "Academic Studio",
        items: [
            { title: "Program Catalog", icon: BookOpen, href: "/admin/courses" },
            { title: "Intake Scheduling", icon: CalendarClock, href: "/admin/batches" },
        ]
    },
    {
        label: "Management & Finance",
        items: [
            { title: "Identity Hub", icon: Users, href: "/admin/users" },
            { title: "Enrollment Ledger", icon: CreditCard, href: "/admin/enrollments" },
        ]
    },
    {
        label: "Support Center",
        items: [
            { title: "Contact Inquiries", icon: MessageSquare, href: "/admin/messages" },
        ]
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[320px] h-screen bg-chocolate text-cream sticky top-0 flex flex-col border-r border-choco-light/5 shadow-[20px_0_50px_rgba(44,24,16,0.2)] z-50">
            {/* Brand Header */}
            <div className="p-10 border-b border-choco-light/10 bg-choco-dark/20 backdrop-blur-sm">
                <Link href="/admin" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose to-rose-dark rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(231,76,60,0.3)] transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <ChefHat className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold serif tracking-tight text-white leading-none mb-1">Shower Flour</h1>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3 text-rose" />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose/80">Premium Admin</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-grow overflow-y-auto px-6 py-8 custom-scrollbar space-y-10">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="space-y-3">
                        <p className="px-4 text-[10px] uppercase tracking-[0.25em] font-bold text-cream/30">
                            {group.label}
                        </p>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group relative",
                                            isActive
                                                ? "bg-rose text-white shadow-lg translate-x-1"
                                                : "hover:bg-choco-light/5 text-cream/60 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "text-white" : "text-rose/50 group-hover:text-rose group-hover:scale-110")} />
                                            <span className="font-bold text-[11px] uppercase tracking-widest">{item.title}</span>
                                        </div>
                                        {isActive && (
                                            <div className="flex items-center">
                                                <ChevronRight className="w-4 h-4 text-white/50" />
                                            </div>
                                        )}
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User & Session Footer */}
            <div className="p-8 border-t border-choco-light/10 bg-choco-dark/20 backdrop-blur-md">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center justify-between p-4 rounded-2xl text-cream/40 hover:bg-rose/10 hover:text-rose transition-all duration-500 group border border-transparent hover:border-rose/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-choco-light/5 flex items-center justify-center group-hover:bg-rose/20 transition-colors">
                            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <span className="font-bold text-[10px] uppercase tracking-widest">Terminate Session</span>
                    </div>
                </button>

                <div className="mt-6 flex items-center gap-4 px-4">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/20">System Node: Primary</p>
                </div>
            </div>
        </aside>
    );
}
