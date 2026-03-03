import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { getCourseById } from "@/app/actions";
import { notFound } from "next/navigation";
import { Clock, PlayCircle, Users, Star, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import EnrollButton from "@/components/courses/EnrollButton";

interface Lesson {
    id: string;
    title: string;
}

interface Batch {
    id: string;
    name: string;
    schedule: string;
    startDate: string | Date;
    maxSeats: number;
    enrolled: number;
}

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number | null;
    thumbnail: string;
    type: string;
    level: string;
    sessions: number;
    duration: string;
    rating: number;
    lessons: Lesson[];
    batches: Batch[];
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
    const res = await getCourseById(params.id);

    if (!res.success || !res.course) {
        return notFound();
    }

    const { course } = res;

    return (
        <div className="pt-32 pb-24 bg-cream min-h-screen">
            <div className="container mx-auto px-6">
                <Link href="/courses" className="inline-flex items-center gap-2 text-chocolate/50 hover:text-rose font-bold text-xs tracking-widest uppercase mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Courses
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex gap-2 mb-6">
                                <Badge variant={course.type.toLowerCase() as BadgeProps["variant"]}>{course.type}</Badge>
                                <Badge variant="gold">{course.level}</Badge>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold serif text-chocolate mb-6 leading-tight">
                                {course.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-chocolate/60 font-medium">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-gold fill-gold" />
                                    <span className="text-chocolate font-bold">{course.rating}</span>
                                    <span>(120+ reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-rose" />
                                    <span>{course.sessions} Sessions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-rose" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white p-10 rounded-3xl border border-cream-dark">
                            <h2 className="text-2xl font-bold serif text-chocolate mb-6">About this Course</h2>
                            <p className="text-chocolate/70 leading-relaxed text-lg whitespace-pre-wrap">
                                {course.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold serif text-chocolate mb-8 flex items-center gap-3">
                                <PlayCircle className="text-rose w-6 h-6" />
                                Course Curriculum
                            </h2>
                            <div className="space-y-4">
                                {course.lessons && course.lessons.length > 0 ? (
                                    course.lessons.map((lesson: Lesson, index: number) => (
                                        <div key={lesson.id} className="bg-white p-6 rounded-2xl border border-cream-dark flex items-center justify-between group hover:border-rose/30 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <span className="text-2xl font-bold text-chocolate/10 group-hover:text-rose/20 transition-colors serif">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                                <div>
                                                    <h4 className="font-bold text-chocolate">{lesson.title}</h4>
                                                    <p className="text-xs text-chocolate/40 font-bold uppercase tracking-widest mt-1">Lesson Module</p>
                                                </div>
                                            </div>
                                            <PlayCircle className="w-6 h-6 text-chocolate/20 group-hover:text-rose transition-colors" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 border border-dashed border-cream-dark rounded-3xl text-center">
                                        <p className="text-chocolate/40 italic">Curriculum details coming soon.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Enrollment */}
                    <div className="space-y-8">
                        <Card className="sticky top-32 border-2 border-chocolate bg-white overflow-hidden shadow-xl shadow-chocolate/5">
                            <div className="aspect-video overflow-hidden">
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-8">
                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-4xl font-bold text-chocolate serif">₹{course.price.toLocaleString()}</span>
                                    {course.oldPrice && (
                                        <span className="text-lg text-chocolate/30 line-through mb-1">₹{course.oldPrice.toLocaleString()}</span>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-chocolate/70 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-rose" />
                                        <span>Lifetime access to recordings</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-chocolate/70 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-rose" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-chocolate/70 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-rose" />
                                        <span>Direct instructor support</span>
                                    </div>
                                </div>

                                <EnrollButton courseId={course.id} />
                                <p className="text-center text-xs text-chocolate/40 font-bold uppercase tracking-widest mt-6">
                                    Secure Payment via Razorpay
                                </p>
                            </CardContent>
                        </Card>

                        {course.batches && course.batches.length > 0 && (
                            <section className="bg-gold/5 border border-gold/20 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold serif text-chocolate mb-6 italic">Available Batches</h3>
                                <div className="space-y-4">
                                    {course.batches.map((batch: Batch) => (
                                        <div key={batch.id} className="bg-white p-4 rounded-xl border border-gold/10">
                                            <p className="font-bold text-chocolate text-sm mb-1">{batch.name}</p>
                                            <p className="text-xs text-chocolate/60">{batch.schedule}</p>
                                            <div className="mt-3 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gold">
                                                <span>Starts: {new Date(batch.startDate).toLocaleDateString()}</span>
                                                <span>{batch.maxSeats - batch.enrolled} Seats left</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
