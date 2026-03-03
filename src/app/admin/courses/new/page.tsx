import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createCourse } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookPlus, Save, ChevronLeft, Sparkles, Image as ImageIcon, Layout, Zap } from "lucide-react";
import Link from "next/link";

export default async function AdminNewCoursePage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="p-12 space-y-12 max-w-6xl mx-auto">
            {/* Header with Navigation back */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-chocolate">
                <div>
                    <Link href="/admin/courses" className="text-[10px] font-bold text-rose uppercase tracking-[0.3em] flex items-center gap-2 mb-6 hover:-translate-x-1 transition-transform group font-sans">
                        <ChevronLeft className="w-3 h-3 transition-transform group-hover:scale-125" />
                        Return to Catalog
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-5 h-5 text-rose" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Curriculum Design</span>
                    </div>
                    <h1 className="text-5xl font-bold serif leading-none">Initialize Program</h1>
                    <p className="text-chocolate/50 mt-4 font-medium italic serif text-lg">Define the architecture of your next signature learning experience.</p>
                </div>
            </div>

            <form action={async (formData) => {
                "use server";
                await createCourse({
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
            }} className="space-y-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Primary Configuration */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none bg-white shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="p-10 border-b border-cream-dark/10">
                                <CardTitle className="serif text-2xl text-chocolate">Core Definition</CardTitle>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Program Title</label>
                                    <input name="title" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-lg text-chocolate placeholder:text-chocolate/20 serif" placeholder="e.g. Traditional French Pastry Masterclass" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">URL Identifier (Slug)</label>
                                        <input name="slug" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" placeholder="french-pastry-masterclass" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Financial Value (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-chocolate/20 serif italic text-xl">₹</span>
                                            <input name="price" type="number" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" placeholder="12499" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Program Narrative</label>
                                    <textarea name="description" required rows={6} className="w-full bg-cream/20 border border-cream-dark/30 rounded-3xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-medium text-sm text-chocolate placeholder:text-chocolate/20 leading-relaxed" placeholder="Chronicle the journey students will undertake..."></textarea>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-white shadow-xl rounded-[40px] overflow-hidden">
                            <CardHeader className="p-10 border-b border-cream-dark/10">
                                <CardTitle className="serif text-2xl text-chocolate">Experience Architecture</CardTitle>
                            </CardHeader>
                            <CardContent className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Delivery Format</label>
                                        <select name="type" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate appearance-none">
                                            <option value="LIVE">Live Interactive Workshops</option>
                                            <option value="RECORDED">On-Demand Curriculum</option>
                                            <option value="HYBRID">Hybrid Model</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Skill Complexity</label>
                                        <select name="level" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate appearance-none">
                                            <option value="BEGINNER">Foundational</option>
                                            <option value="INTERMEDIATE">Intermediate Mastery</option>
                                            <option value="ADVANCED">Grandmaster Elite</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Session Volume</label>
                                        <div className="relative">
                                            <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/20" />
                                            <input name="sessions" type="number" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" placeholder="12 Sessions" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-chocolate/30 uppercase tracking-[0.2em] ml-1">Temporal Commitment</label>
                                        <div className="relative">
                                            <Zap className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate/20" />
                                            <input name="duration" required className="w-full bg-cream/20 border border-cream-dark/30 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-rose/5 transition-all font-bold text-sm text-chocolate" placeholder="e.g. 6 Weeks Comprehensive" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Operational Actions */}
                    <div className="space-y-8">
                        <Card className="border-none bg-chocolate text-cream shadow-2xl rounded-[40px] overflow-hidden sticky top-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <CardHeader className="p-8 border-b border-choco-light/10 relative z-10">
                                <CardTitle className="serif text-2xl text-white">Visual Context</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-cream/30 uppercase tracking-[0.2em] ml-1">Thumbnail Repository Link</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20" />
                                        <input name="thumbnail" required className="w-full bg-choco-light/10 border border-choco-light/20 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-rose/40 transition-all font-bold text-xs text-white" placeholder="https://cloud.storage/asset.jpg" />
                                    </div>
                                </div>
                                <div className="aspect-video bg-choco-dark/30 rounded-[32px] border-2 border-dashed border-choco-light/10 flex flex-col items-center justify-center text-cream/20 gap-2 p-4">
                                    <ImageIcon className="w-10 h-10 opacity-10" />
                                    <p className="text-[8px] uppercase tracking-widest font-bold text-center">External Asset Preview Not Verified</p>
                                </div>

                                <div className="pt-4 border-t border-choco-light/10">
                                    <Button type="submit" className="w-full bg-rose hover:bg-rose-dark text-white rounded-[24px] py-10 flex flex-col items-center justify-center gap-2 font-bold uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-rose/20 transition-all active:scale-95 group text-white bg-rose">
                                        <Save className="w-6 h-6 transition-transform group-hover:scale-110" />
                                        Finalize Architecture
                                    </Button>
                                    <p className="text-center text-cream/20 text-[8px] uppercase tracking-widest mt-4 font-bold">Protocol: Permanent Storage</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
