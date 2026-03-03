import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBatches, deleteBatch, getCourses, createBatch } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, Plus, Trash2, Clock, MapPin, CalendarClock, ChevronRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default async function AdminBatchesPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const [{ batches }, { courses }] = await Promise.all([
        getBatches(),
        getCourses()
    ]);

    return (
        <div className="p-12 space-y-12">
            {/* Academic Scheduling Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Operations & Logistics</span>
                    </div>
                    <h1 className="text-4xl font-bold serif text-chocolate">Intake Scheduling</h1>
                    <p className="text-chocolate/60 mt-2 font-medium italic serif text-lg pb-1">Precision planning and capacity management for your academic cycles.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Dynamic Batch Repository */}
                <div className="xl:col-span-2 space-y-6">
                    {batches?.map((batch) => (
                        <Card key={batch.id} className="border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group rounded-[32px]">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-3xl bg-cream flex flex-col items-center justify-center text-rose border border-cream-dark transition-all duration-700 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                                            <Calendar className="w-8 h-8 opacity-20 absolute" />
                                            <span className="text-lg font-bold serif leading-none">{new Date(batch.startDate).getDate()}</span>
                                            <span className="text-[9px] uppercase font-bold tracking-widest">{new Date(batch.startDate).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-chocolate text-2xl serif leading-tight">{batch.name}</h3>
                                                <Badge className="bg-rose text-white border-none font-bold text-[8px] tracking-[0.2em] uppercase px-3 py-1 shadow-sm">
                                                    {batch.course.title}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold text-chocolate/40 uppercase tracking-[0.15em]">
                                                <span className="flex items-center gap-2 bg-cream/50 px-3 py-1.5 rounded-full border border-cream-dark/10">
                                                    <Clock className="w-3.5 h-3.5 text-rose" />
                                                    {batch.schedule}
                                                </span>
                                                <span className="flex items-center gap-2 bg-cream/50 px-3 py-1.5 rounded-full border border-cream-dark/10">
                                                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                                                    {batch.enrollments.length} / {batch.maxSeats} Capacity
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <form action={async () => {
                                            "use server";
                                            await deleteBatch(batch.id);
                                        }}>
                                            <Button variant="ghost" className="text-rose/20 hover:text-rose hover:bg-rose/5 h-12 w-12 p-0 rounded-2xl transition-all">
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </form>
                                        <Button className="bg-chocolate hover:bg-rose text-white rounded-2xl px-6 h-12 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[9px] transition-all duration-500 shadow-lg text-white">
                                            Manage Roster <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {(!batches || batches.length === 0) && (
                        <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-cream-dark/10 shadow-inner">
                            <CalendarClock className="w-16 h-16 text-chocolate/10 mx-auto mb-6" />
                            <p className="text-chocolate/30 italic font-medium serif text-2xl">No academic intakes are currently scheduled.</p>
                        </div>
                    )}
                </div>

                {/* Logistics Configuration Panel */}
                <div className="xl:col-span-1">
                    <Card className="border-none bg-chocolate text-cream shadow-2xl rounded-[40px] sticky top-12 overflow-hidden border border-choco-light/5">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-rose/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                        <CardHeader className="p-10 border-b border-choco-light/10 relative z-10">
                            <CardTitle className="serif text-2xl text-white">Schedule New Intake</CardTitle>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-cream/30 mt-1">Configure logistical parameters</p>
                        </CardHeader>
                        <CardContent className="p-10 relative z-10">
                            <form action={async (formData) => {
                                "use server";
                                const data = Object.fromEntries(formData.entries());
                                await createBatch(data);
                            }} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Academic Program</label>
                                    <select name="courseId" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all font-bold text-sm appearance-none text-cream shadow-inner">
                                        {courses?.map(c => (
                                            <option key={c.id} value={c.id} className="bg-chocolate">{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Intake Nomenclature</label>
                                    <input name="name" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all font-bold text-sm placeholder:text-cream/20 text-cream shadow-inner" placeholder="E.g. Signature Masterclass A1" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Weekly Cadence</label>
                                    <input name="schedule" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all font-bold text-sm placeholder:text-cream/20 text-cream shadow-inner" placeholder="Mon & Wed, 6 PM - 9 PM" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Commences</label>
                                        <input name="startDate" type="date" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all font-bold text-sm text-cream shadow-inner" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Seating Limit</label>
                                        <input name="maxSeats" type="number" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all font-bold text-sm placeholder:text-cream/20 text-cream shadow-inner" placeholder="25" />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full bg-rose hover:bg-rose-dark text-white rounded-2xl py-8 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-rose/20 mt-6 transition-all active:scale-95 text-white bg-rose">
                                    <Plus className="w-5 h-5" /> Initialize intake cycle
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
