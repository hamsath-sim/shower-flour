import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCourses } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, BookOpen, Clock, Users, Star, ArrowRight, Settings2, BarChart3, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default async function AdminCoursesPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const { courses } = await getCourses();

    return (
        <div className="p-12 space-y-10">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 bg-chocolate p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1 h-1 rounded-full bg-rose" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Academic Studio</span>
                    </div>
                    <h1 className="text-4xl font-bold serif text-white">Program Catalog</h1>
                    <p className="text-cream/40 mt-2 font-medium italic serif">Architecture and oversight of your signature learning experiences.</p>
                </div>
                <Link href="/admin/courses/new" className="relative z-10">
                    <Button className="bg-rose hover:bg-rose-dark text-white rounded-2xl px-10 py-7 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-lg shadow-rose/20 transition-all hover:-translate-y-1 active:scale-95">
                        <Plus className="w-5 h-5" />
                        Initialize New Program
                    </Button>
                </Link>
            </div>

            {/* Program Ledger List */}
            <div className="space-y-4">
                {courses?.map((course) => (
                    <Card key={course.id} className="border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex flex-col xl:flex-row xl:items-center gap-10">
                                {/* Program Visual Identity */}
                                <div className="flex items-center gap-6 xl:w-1/3">
                                    <div className="w-24 h-24 relative rounded-3xl overflow-hidden shadow-inner border border-cream-dark/10 group-hover:rotate-3 transition-transform duration-700">
                                        <Image
                                            src={course.thumbnail}
                                            alt={course.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className="bg-rose/5 text-rose border-rose/10 font-bold text-[7px] tracking-widest uppercase px-2 py-0">
                                                {course.type}
                                            </Badge>
                                            <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-bold text-[7px] tracking-widest uppercase px-2 py-0">
                                                {course.level}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold serif text-chocolate truncate">{course.title}</h3>
                                        <p className="text-[10px] font-bold text-chocolate/30 uppercase tracking-widest mt-1">Slug: {course.slug}</p>
                                    </div>
                                </div>

                                {/* Operational Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow xl:border-l border-cream-dark/10 xl:pl-10">
                                    <div>
                                        <p className="text-[9px] uppercase font-bold text-chocolate/30 tracking-[0.2em] mb-2">Structure</p>
                                        <div className="flex items-center gap-2">
                                            <Layers className="w-3.5 h-3.5 text-rose" />
                                            <span className="text-xs font-bold text-chocolate italic serif">{course.sessions} Sessions</span>
                                        </div>
                                        <p className="text-[10px] text-chocolate/50 mt-1">{course.duration}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold text-chocolate/30 tracking-[0.2em] mb-2">Commercial</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-bold text-chocolate tabular-nums">₹{course.price.toLocaleString()}</span>
                                            {course.oldPrice && <span className="text-[10px] text-chocolate/30 line-through">₹{course.oldPrice.toLocaleString()}</span>}
                                        </div>
                                        <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest mt-1 italic">Active Revenue</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-bold text-chocolate/30 tracking-[0.2em] mb-2">Performance</p>
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                                            <span className="text-xs font-bold text-chocolate">{course.batches.length || 0} Batches Live</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 text-amber-400">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-[10px] font-bold text-chocolate/50">{course.rating.toFixed(1)} Rating</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <Link href={`/admin/courses/${course.id}`} className="w-full">
                                            <Button variant="outline" className="w-full border-cream-dark hover:border-rose hover:bg-rose hover:text-white rounded-xl h-12 flex items-center justify-between px-5 group/btn transition-all duration-300">
                                                <span className="text-[9px] font-bold uppercase tracking-widest">Master Control</span>
                                                <Settings2 className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {(!courses || courses.length === 0) && (
                    <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-cream-dark/20 shadow-inner">
                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6 text-chocolate/20">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <p className="text-chocolate/40 italic font-medium serif text-2xl">The program catalog is currently empty.</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/20 mt-3">Initialize your first curriculum to begin</p>
                    </div>
                )}
            </div>
        </div>
    );
}
