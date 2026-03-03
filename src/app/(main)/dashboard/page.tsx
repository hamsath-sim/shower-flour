import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserEnrollments } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeProps } from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { Video, BookOpen, Clock, Calendar } from "lucide-react";

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    type: string;
}

interface Batch {
    id: string;
    name: string;
    schedule: string;
}

interface Enrollment {
    id: string;
    course: Course;
    batch?: Batch | null;
    progress: number;
}

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    const res = await getUserEnrollments(session.user.id!);
    const enrollments = res.enrollments || [];

    return (
        <div className="pt-32 pb-24 bg-cream min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Welcome Back</span>
                        <h1 className="text-5xl font-bold serif text-chocolate">My Learning</h1>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-cream-dark shadow-sm">
                        <p className="text-sm text-chocolate/50 font-medium">Logged in as</p>
                        <p className="text-lg font-bold text-chocolate serif">{session.user.name}</p>
                    </div>
                </div>

                {enrollments.length === 0 ? (
                    <Card className="border border-cream-dark bg-white/50 border-dashed py-20">
                        <CardContent className="text-center">
                            <h3 className="text-2xl font-bold serif text-chocolate mb-4">No Enrollments Yet</h3>
                            <p className="text-chocolate/60 mb-8 max-w-md mx-auto">
                                You haven&apos;t enrolled in any courses yet. Start your baking journey today by exploring our masterclasses!
                            </p>
                            <Link href="/courses">
                                <Button className="bg-chocolate hover:bg-choco-dark text-white rounded-full px-10 py-6">
                                    Browse Courses
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-2xl font-bold serif text-chocolate flex items-center gap-3">
                                <BookOpen className="text-rose w-6 h-6" />
                                Your Enrolled Courses
                            </h2>
                            <div className="grid gap-6">
                                {enrollments.map((enr: Enrollment) => (
                                    <Card key={enr.id} className="overflow-hidden border border-cream-dark bg-white group hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="w-full md:w-48 aspect-video md:aspect-square overflow-hidden">
                                                <Image
                                                    src={enr.course.thumbnail}
                                                    alt={enr.course.title}
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <Badge variant={enr.course.type.toLowerCase() as BadgeProps["variant"]}>{enr.course.type}</Badge>
                                                        <span className="text-xs font-bold text-rose tracking-widest uppercase">
                                                            {enr.progress}% Complete
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold serif text-chocolate mb-2">{enr.course.title}</h3>
                                                    {enr.batch && (
                                                        <div className="flex items-center gap-4 text-xs text-chocolate/50 font-bold uppercase tracking-tighter">
                                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {enr.batch.name}</span>
                                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {enr.batch.schedule}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-6 pt-6 border-t border-cream-dark flex items-center justify-between">
                                                    <div className="w-2/3 h-1.5 bg-cream-dark rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-rose transition-all duration-1000"
                                                            style={{ width: `${enr.progress}%` }}
                                                        />
                                                    </div>
                                                    <Link href={`/courses/${enr.course.id}`}>
                                                        <Button variant="ghost" size="sm" className="text-rose hover:text-rose p-0 bg-transparent font-bold">
                                                            Continue →
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold serif text-chocolate flex items-center gap-3">
                                <Video className="text-rose w-6 h-6" />
                                Live Sessions
                            </h2>
                            <div className="space-y-4">
                                {enrollments
                                    .filter((enr: Enrollment) => enr.course.type === "LIVE" || enr.course.type === "HYBRID")
                                    .map((enr: Enrollment) => (
                                        <Card key={`live-${enr.id}`} className="border border-cream-dark bg-white p-6">
                                            <p className="text-xs font-bold text-chocolate/40 uppercase tracking-widest mb-1">Upcoming for</p>
                                            <h4 className="font-bold text-chocolate mb-6 line-clamp-1">{enr.course.title}</h4>

                                            {/* In a real app, we check if there's an ACTIVE zoom link for this batch */}
                                            {enr.progress < 100 ? (
                                                <div className="space-y-4">
                                                    <div className="bg-rose/5 border border-rose/10 p-4 rounded-xl text-center">
                                                        <Video className="w-8 h-8 text-rose mx-auto mb-2" />
                                                        <p className="text-xs font-bold text-rose uppercase">Next Session Live Soon</p>
                                                    </div>
                                                    <Button className="w-full bg-chocolate hover:bg-choco-dark text-white rounded-xl py-6 flex items-center justify-center gap-2">
                                                        <Video className="w-4 h-4" />
                                                        Join Live Class
                                                    </Button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-chocolate/40 text-center py-4 italic">No active sessions</p>
                                            )}
                                        </Card>
                                    ))}
                                {enrollments.filter((enr: Enrollment) => enr.course.type === "LIVE" || enr.course.type === "HYBRID").length === 0 && (
                                    <p className="text-sm text-chocolate/40 py-8 text-center border border-dashed border-cream-dark rounded-2xl">
                                        No live courses enrolled.
                                    </p>
                                )}
                            </div>

                            <Card className="bg-gold/10 border-gold/20 border p-8 rounded-3xl">
                                <h4 className="text-xl font-bold serif text-chocolate mb-4 italic">Need Help?</h4>
                                <p className="text-sm text-chocolate/70 mb-6"> Our instructors are here to guide you through your baking journey. Join our community discord!</p>
                                <Button className="w-full bg-gold hover:bg-gold/80 text-white rounded-full">
                                    Join Community
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
