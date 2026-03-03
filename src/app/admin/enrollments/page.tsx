import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEnrollments, updateEnrollmentStatus } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, User, BookOpen, CreditCard, Calendar, Filter, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AdminEnrollmentsPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const { enrollments } = await getEnrollments();

    return (
        <div className="p-12 space-y-10">
            {/* Financial Ledger Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1 h-1 rounded-full bg-rose" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Financial Oversight</span>
                    </div>
                    <h1 className="text-4xl font-bold serif text-chocolate">Enrollment Ledger</h1>
                    <p className="text-chocolate/60 mt-2 font-medium italic serif text-lg">Detailed audit of all program registrations and payment clearance.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white border-cream-dark/10 rounded-2xl px-6 h-14 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-chocolate/60 shadow-sm transition-all hover:bg-cream/20 font-sans">
                        <Download className="w-4 h-4" /> Export Audit (.CSV)
                    </Button>
                    <div className="bg-chocolate rounded-2xl px-8 h-14 flex items-center gap-4 shadow-xl border border-choco-light/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose shadow-[0_0_10px_rgba(231,76,60,0.5)]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream">Accounting Mode Active</p>
                    </div>
                </div>
            </div>

            {/* Transactional Repository */}
            <div className="bg-white rounded-[40px] shadow-sm border border-cream-dark/10 overflow-hidden">
                <div className="p-8 border-b border-cream-dark/10 bg-cream/5 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-[9px] uppercase font-bold text-chocolate/30 tracking-widest mb-1">Active Ledger</p>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-rose" />
                                <span className="font-bold text-chocolate text-sm serif italic">February 2026 Operations</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-cream-dark/10" />
                        <div>
                            <p className="text-[9px] uppercase font-bold text-chocolate/30 tracking-widest mb-1">Verification Status</p>
                            <Badge className="bg-rose/5 text-rose border-rose/10 uppercase text-[8px] font-bold tracking-widest">
                                {enrollments?.filter(e => !e.paid).length ?? 0} Pending Clearance
                            </Badge>
                        </div>
                    </div>
                    <Button variant="outline" className="border-cream-dark rounded-xl px-5 h-10 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-chocolate/40 hover:text-chocolate">
                        <Filter className="w-3.5 h-3.5" /> Filter Ledger
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-cream/5 border-b border-cream-dark/10">
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Student Detail</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Program & Intake</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Financial Context</th>
                                <th className="text-left py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Clearance Status</th>
                                <th className="text-right py-6 px-10 text-[9px] uppercase tracking-widest font-bold text-chocolate/40">Ledger Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-dark/5">
                            {enrollments?.map((e) => (
                                <tr key={e.id} className="group hover:bg-cream/5 transition-all duration-300">
                                    <td className="py-8 px-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-chocolate/20 border border-cream-dark shadow-inner group-hover:bg-white transition-colors duration-500">
                                                <User className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-chocolate serif text-base leading-tight">{e.user.name || "Legacy Member"}</p>
                                                <p className="text-[10px] text-chocolate/40 font-medium tabular-nums font-sans">{e.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm font-bold text-chocolate serif italic leading-tight">
                                                <BookOpen className="w-3.5 h-3.5 text-rose/50" />
                                                {e.course.title}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-chocolate/40 uppercase tracking-widest">
                                                <Calendar className="w-3 h-3 text-rose/40" />
                                                Intake: {e.batch?.name || "Standard Session"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-base font-bold text-chocolate serif tabular-nums">
                                                <span className="text-rose/40 text-sm italic">₹</span>
                                                {e.amount.toLocaleString()}
                                            </div>
                                            <p className="text-[9px] font-bold text-chocolate/40 uppercase tracking-widest">{new Date(e.createdAt).toLocaleDateString()} • TxID: {e.id.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <Badge className={cn(
                                            "uppercase text-[9px] tracking-widest font-bold px-4 py-1.5 border-none shadow-[inside_0_1px_2px_rgba(0,0,0,0.05)]",
                                            e.paid
                                                ? "bg-green-500/10 text-green-600 italic serif lowercase first-letter:uppercase"
                                                : "bg-rose/5 text-rose italic serif lowercase first-letter:uppercase"
                                        )}>
                                            {e.paid ? "Cleared" : "Awaiting Clearance"}
                                        </Badge>
                                    </td>
                                    <td className="py-8 px-10 text-right">
                                        <form action={async () => {
                                            "use server";
                                            await updateEnrollmentStatus(e.id, !e.paid);
                                        }}>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "px-6 h-11 rounded-2xl font-bold uppercase tracking-widest text-[9px] flex items-center gap-2 transition-all duration-500 shadow-sm border border-cream-dark/20",
                                                    e.paid
                                                        ? "hover:bg-rose/5 hover:text-rose hover:border-rose/20"
                                                        : "bg-chocolate text-white border-chocolate hover:bg-rose hover:border-rose shadow-lg shadow-rose/10"
                                                )}
                                            >
                                                {e.paid ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                {e.paid ? "Revoke Clearance" : "Authorize Transaction"}
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!enrollments || enrollments.length === 0) && (
                    <div className="py-32 text-center bg-cream/10 border-t border-cream-dark/10">
                        <p className="text-chocolate/30 italic serif text-2xl font-medium">No ledger entries recorded for this period.</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-chocolate/20 mt-3 italic">Maintain rigorous audit trails</p>
                    </div>
                )}
            </div>
        </div>
    );
}
