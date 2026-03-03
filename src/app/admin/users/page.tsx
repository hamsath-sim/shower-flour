import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUsers, deleteUser } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, Calendar, Trash2, User, Users, ShieldCheck, Phone, Filter, MoreVertical, Search, History } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default async function AdminUsersPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const { users } = await getUsers();

    return (
        <div className="p-12 space-y-10">
            {/* Identity Control Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1 h-1 rounded-full bg-rose" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Security & Permissions</span>
                    </div>
                    <h1 className="text-4xl font-bold serif text-chocolate">Identity Hub</h1>
                    <p className="text-chocolate/60 mt-2 font-medium italic serif text-lg text-balance">Management and oversight of all authorized platform identities.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white border border-cream-dark/10 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
                        <Users className="w-5 h-5 text-rose" />
                        <div className="pr-4 border-r border-cream-dark/10">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/30">Total identities</p>
                            <p className="text-xl font-bold text-chocolate serif">{users?.length ?? 0}</p>
                        </div>
                        <div className="pl-2">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/30">Admin nodes</p>
                            <p className="text-xl font-bold text-chocolate serif">{users?.filter(u => u.role === "ADMIN").length ?? 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Table View */}
            <div className="bg-white rounded-[40px] shadow-sm border border-cream-dark/10 overflow-hidden">
                <div className="p-8 border-b border-cream-dark/10 bg-cream/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/30" />
                        <input
                            placeholder="Filter by name, email, or role..."
                            className="w-full bg-white border border-cream-dark rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all shadow-inner"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-cream-dark rounded-xl px-6 h-12 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-chocolate/60">
                            <Filter className="w-4 h-4" /> Filter Views
                        </Button>
                        <Button variant="outline" className="border-cream-dark rounded-xl px-6 h-12 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-chocolate/60">
                            <History className="w-4 h-4" /> Usage Logs
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-cream/5 border-b border-cream-dark/10">
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Authorized Identity</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Credential Context</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Access Protocol</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40 text-right">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-dark/5">
                            {users?.map((u) => (
                                <tr key={u.id} className="group hover:bg-cream/5 transition-colors">
                                    <td className="py-6 px-10">
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm border border-cream-dark/10",
                                                u.role === "ADMIN" ? "bg-rose/5 text-rose" : "bg-blue-50 text-blue-600"
                                            )}>
                                                {u.role === "ADMIN" ? <ShieldCheck className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-chocolate serif text-lg leading-none mb-1.5">{u.name || "Legacy Member"}</p>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-chocolate/40 uppercase tracking-widest">
                                                    <Calendar className="w-3 h-3 text-rose/50" />
                                                    Node Joined {new Date(u.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-10">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-sm font-medium text-chocolate/80 italic serif">
                                                <Mail className="w-3.5 h-3.5 text-rose/40" />
                                                {u.email}
                                            </div>
                                            {u.phone && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-chocolate/40 uppercase tracking-widest">
                                                    <Phone className="w-3 h-3 text-rose/40" />
                                                    {u.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-10">
                                        <Badge className={cn(
                                            "uppercase text-[9px] tracking-[0.2em] font-bold px-3 py-1 border shadow-sm",
                                            u.role === "ADMIN"
                                                ? "bg-rose border-rose text-white"
                                                : "bg-white border-blue-200 text-blue-600"
                                        )}>
                                            {u.role}
                                        </Badge>
                                    </td>
                                    <td className="py-6 px-10 text-right">
                                        {u.role !== "ADMIN" && (
                                            <form action={async () => {
                                                "use server";
                                                await deleteUser(u.id);
                                            }} className="inline-block">
                                                <Button variant="ghost" className="text-rose hover:bg-rose/5 h-10 w-10 p-0 rounded-xl transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        )}
                                        <Button variant="ghost" className="text-chocolate/20 hover:text-chocolate h-10 w-10 p-0 rounded-xl transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!users || users.length === 0) && (
                    <div className="py-32 text-center bg-cream/10 border-t border-cream-dark/10">
                        <p className="text-chocolate/30 italic serif text-2xl">Identity directory is currently empty.</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/20 mt-3 italic">Check synchronization with Auth Service</p>
                    </div>
                )}
            </div>
        </div>
    );
}
