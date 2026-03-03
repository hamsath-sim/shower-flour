import { auth } from "@/lib/auth";
import { getAdminStats } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
    Users,
    BookOpen,
    GraduationCap,
    MessageSquare,
    TrendingUp,
    IndianRupee,
    Clock,
    UserPlus,
    Activity,
    Award,
    ChevronRight,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import AdminLogin from "@/components/admin/AdminLogin";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        return <AdminLogin />;
    }

    const { stats } = await getAdminStats();

    return (
        <div className="p-12 space-y-12">
            {/* Intelligence Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Executive Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-bold serif text-chocolate">The Studio Dashboard</h1>
                    <p className="text-chocolate/60 mt-3 font-medium text-lg italic serif">Precision control over your platform's growth and academic excellence.</p>
                </div>

                <div className="flex gap-4">
                    <div className="px-8 py-4 bg-white rounded-3xl border border-cream-dark/10 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Market pulse</p>
                            <p className="text-sm font-bold text-chocolate italic">Stable Performance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <KPICard title="Revenue Analytics" value={`₹${stats?.revenue.toLocaleString()}`} icon={<IndianRupee className="w-5 h-5" />} trend="+12.5% vs last month" bg="rose" />
                <KPICard title="Active Learning Hub" value={stats?.userCount ?? 0} icon={<Users className="w-5 h-5" />} trend="High engagement" bg="blue" />
                <KPICard title="Academic Catalog" value={stats?.courseCount ?? 0} icon={<BookOpen className="w-5 h-5" />} trend="Active Programs" bg="amber" />
                <KPICard title="Platform Support" value={stats?.messageCount ?? 0} icon={<MessageSquare className="w-5 h-5" />} trend="Response needed" bg="emerald" />
            </div>

            {/* In-Depth Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Academic Performance */}
                <Card className="xl:col-span-2 border-none bg-white shadow-xl rounded-[40px] overflow-hidden">
                    <CardHeader className="p-10 border-b border-cream-dark/10 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="serif text-3xl text-chocolate">Academic Insights</CardTitle>
                            <p className="text-xs font-bold text-chocolate/30 uppercase tracking-widest mt-1">Course engagement & conversion</p>
                        </div>
                        <Link href="/admin/courses" className="text-[10px] font-bold text-rose uppercase tracking-widest flex items-center gap-2 hover:underline">
                            Full Catalog <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="space-y-8">
                            {stats?.topCourses.map((course: any, i: number) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-3xl bg-cream flex items-center justify-center text-rose border border-cream-dark transition-all duration-500 group-hover:bg-rose group-hover:text-white group-hover:shadow-lg group-hover:rotate-6">
                                            <Award className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-chocolate text-xl serif leading-tight">{course.title}</h3>
                                            <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/30 mt-1">Tier-1 Best Seller</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                            <span className="font-bold text-chocolate text-2xl serif">{course._count.enrollments}</span>
                                        </div>
                                        <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/30">Total Enrolled</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Real-time Activity Hub */}
                <Card className="border-none bg-chocolate text-cream shadow-2xl rounded-[40px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose/20 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <CardHeader className="p-10 border-b border-choco-light/10 relative z-10">
                        <CardTitle className="serif text-2xl text-white">Recent Identity Flow</CardTitle>
                        <p className="text-[9px] uppercase tracking-widest font-bold text-cream/30 mt-1">Live Registration Feed</p>
                    </CardHeader>
                    <CardContent className="p-10 relative z-10">
                        <div className="space-y-8">
                            {stats?.recentUsers.map((user: any, i: number) => (
                                <div key={i} className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-2xl bg-choco-light/10 flex items-center justify-center text-rose shadow-inner">
                                        <UserPlus className="w-5 h-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-sm text-white serif">{user.name || "Legacy Member"}</h4>
                                        <p className="text-[9px] text-cream/40 font-bold uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()} • {user.email.split('@')[0]}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-choco-light/10">
                            <Link href="/admin/users" className="w-full h-16 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-between px-6 transition-all group">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Audit Full Directory</span>
                                <ChevronRight className="w-4 h-4 text-rose transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function KPICard({ title, value, icon, trend, bg }: { title: string, value: string | number, icon: React.ReactNode, trend: string, bg: string }) {
    const bgClasses: any = {
        rose: "bg-rose/5 text-rose border-rose/10",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100"
    };

    return (
        <Card className="border-none bg-white shadow-sm hover:shadow-xl transition-all duration-700 rounded-3xl group h-full">
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110", bgClasses[bg])}>
                        {icon}
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em]">{title}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-4xl font-bold serif text-chocolate tabular-nums tracking-tighter transition-all group-hover:translate-x-1">{value}</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-chocolate/40">{trend}</p>
                </div>
            </CardContent>
        </Card>
    );
}
