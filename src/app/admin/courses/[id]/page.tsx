import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCourseById, updateCourse, deleteCourse } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, ChevronLeft, Trash2, Settings2, Image as ImageIcon, BarChart3, Clock, Layout } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminEditCoursePage({
    params,
}: {
    params: { id: string };
}) {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const { course } = await getCourseById(params.id);

    if (!course) {
        redirect("/admin/courses");
    }

    return (
        <div className="p-12 space-y-12 max-w-7xl mx-auto">
            {/* Dynamic Context Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-chocolate">
                <div>
                    <Link href="/admin/courses" className="text-[10px] font-bold text-rose uppercase tracking-[0.3em] flex items-center gap-2 mb-6 hover:-translate-x-1 transition-transform group font-sans">
                        <ChevronLeft className="w-3 h-3" /> Return to Catalog
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <Settings2 className="w-5 h-5 text-rose animate-[spin_10s_linear_infinite]" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Architecture Modification</span>
                    </div>
                    <h1 className="text-5xl font-bold serif leading-none">{course.title}</h1>
                    <p className="text-chocolate/50 mt-4 font-medium italic serif text-lg">System ID: {course.id.toUpperCase()}</p>
                </div>

                <form action={async () => {
                    "use server";
                    await deleteCourse(params.id);
                }}>
                    <Button variant="outline" className="border-rose/20 text-rose hover:bg-rose hover:text-white rounded-2xl px-10 py-7 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all hover:shadow-xl hover:shadow-rose/10 group">
                        <Trash2 className="w-4 h-4 group-hover:rotate-12" /> Terminate Program
                    </Button>
                </form>
            </div>

            <form action={async (formData) => {
                "use server";
                await updateCourse(course.id, {
                    title: formData.get("title"),
                    slug: formData.get("slug"),
                    description: formData.get("description"),
                    price: formData.get("price"),
                    thumbnail: formData.get("thumbnail"),
                    type: formData.get("type"),
                    level: formData.get("level"),
                    sessions: formData.get("sessions"),
                    duration: formData.get("duration"),
                });
            }} className="space-y-12 pb-24">
                <input type="hidden" name="id" value={course.id} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Functional Definitions */}
                    <div className="lg:col-span-2 space-y-10">
                        <Card className="border-none bg-white shadow-xl rounded-[44px] overflow-hidden">
                            <CardHeader className="p-12 border-b border-cream-dark/10">
                                <CardTitle className="serif text-2xl text-chocolate flex items-center gap-4">
                                    <div className="w-2 h-8 bg-rose rounded-full" /> Structure & Logic
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-12 space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Curriculum Designation</label>
                                    <input name="title" defaultValue={course.title} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-3xl px-8 py-6 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-2xl text-chocolate serif shadow-inner" />
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">URL Identifier</label>
                                        <input name="slug" defaultValue={course.slug} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate/70" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Market Valuation (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-chocolate/20 serif italic text-xl">₹</span>
                                            <input name="price" type="number" defaultValue={course.price} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Program Chronicles</label>
                                    <textarea name="description" defaultValue={course.description} required rows={8} className="w-full bg-cream/10 border border-cream-dark/30 rounded-[32px] px-8 py-6 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-medium text-base text-chocolate leading-[1.8] shadow-inner"></textarea>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-white shadow-xl rounded-[44px] overflow-hidden">
                            <CardHeader className="p-12 border-b border-cream-dark/10">
                                <CardTitle className="serif text-2xl text-chocolate flex items-center gap-4">
                                    <div className="w-2 h-8 bg-blue-500 rounded-full" /> Capability Matrix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Delivery Protocol</label>
                                        <select name="type" defaultValue={course.type} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate appearance-none">
                                            <option value="LIVE">Live Interactive workshops</option>
                                            <option value="RECORDED">On-Demand Curriculum</option>
                                            <option value="HYBRID">Hybrid Execution</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Cognitive Complexity</label>
                                        <select name="level" defaultValue={course.level} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate appearance-none">
                                            <option value="BEGINNER">Foundational</option>
                                            <option value="INTERMEDIATE">Intermediate Mastery</option>
                                            <option value="ADVANCED">Grandmaster Elite</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Session Frequency</label>
                                        <div className="relative">
                                            <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/20" />
                                            <input name="sessions" type="number" defaultValue={course.sessions} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Temporal Envelope</label>
                                        <div className="relative">
                                            <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/20" />
                                            <input name="duration" defaultValue={course.duration} required className="w-full bg-cream/10 border border-cream-dark/30 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Visual & Analytical Sidebar */}
                    <div className="space-y-10">
                        <Card className="border-none bg-chocolate text-cream shadow-2xl rounded-[44px] overflow-hidden sticky top-8">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-rose/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                            <CardHeader className="p-10 border-b border-choco-light/10 relative z-10">
                                <CardTitle className="serif text-2xl text-white">Curriculum Identity</CardTitle>
                            </CardHeader>
                            <CardContent className="p-10 space-y-10 relative z-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Cloud Image Repository</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20" />
                                        <input name="thumbnail" defaultValue={course.thumbnail} required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/40 transition-all font-bold text-xs text-white" />
                                    </div>
                                </div>
                                <div className="aspect-video relative rounded-3xl overflow-hidden border border-choco-light/10 shadow-2xl group cursor-zoom-in">
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">Live Asset Preview</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-choco-light/10 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/30">Node Uptime</p>
                                        <div className="flex items-center gap-2 text-green-500 font-bold text-[9px] uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Established
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full bg-rose hover:bg-rose-dark text-white rounded-[28px] py-10 flex flex-col items-center justify-center gap-2 font-bold uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-rose/20 transition-all active:scale-95 group text-white bg-rose border-none">
                                        <Save className="w-6 h-6" />
                                        Commit Modifications
                                    </Button>
                                    <p className="text-center text-cream/20 text-[8px] uppercase tracking-widest font-bold">Protocol: Secure Revalidation</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
