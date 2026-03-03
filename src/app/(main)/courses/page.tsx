import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Search } from "lucide-react";
import { getCourses } from "@/app/actions";
import Image from "next/image";

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    type: string;
    level: string;
    sessions: number;
    duration: string;
    price: number;
    oldPrice?: number | null;
}

export default async function CoursesPage() {
    const res = await getCourses();
    const courses = res.courses || [];

    return (
        <div className="pt-32 pb-24 bg-cream min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mb-16">
                    <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Master the Craft</span>
                    <h1 className="text-5xl font-bold serif text-chocolate mb-4">Our Courses</h1>
                    <p className="text-chocolate/70 text-lg">
                        Choose from live sessions, recorded masterclasses, or hybrid programs designed for every level.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16 border-b border-cream-dark pb-8">
                    <div className="flex flex-wrap gap-3">
                        {["All", "Live", "Recorded", "Hybrid"].map((filter) => (
                            <button
                                key={filter}
                                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === "All"
                                    ? "bg-chocolate text-white shadow-md shadow-chocolate/20"
                                    : "bg-white text-chocolate/50 hover:bg-white hover:text-chocolate border border-cream-dark"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-chocolate/30 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full bg-white border border-cream-dark rounded-full pl-14 pr-8 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all font-medium"
                        />
                    </div>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-cream-dark border-dashed">
                        <p className="text-chocolate/40 font-medium">No courses found. Add some from the admin panel!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.map((course: Course) => (
                            <Card key={course.id} className="group border border-cream-dark bg-white">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={course.thumbnail}
                                        alt={course.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge variant={course.type.toLowerCase() as BadgeProps["variant"]}>{course.type}</Badge>
                                        <Badge variant="gold">{course.level}</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} className="text-gold text-lg">★</span>
                                        ))}
                                        <span className="text-xs text-chocolate/40 font-bold ml-1">(80+)</span>
                                    </div>
                                    <h3 className="text-xl font-bold serif text-chocolate mb-4 leading-snug group-hover:text-rose transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-6 text-sm text-chocolate/50 font-medium mb-8">
                                        <span className="flex items-center gap-2">🎥 {course.sessions} Sessions</span>
                                        <span className="flex items-center gap-2">⏳ {course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-cream-dark">
                                        <div>
                                            <span className="text-2xl font-bold text-chocolate serif">₹{course.price.toLocaleString()}</span>
                                            {course.oldPrice && (
                                                <span className="text-sm text-chocolate/30 line-through ml-2">₹{course.oldPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-rose hover:text-rose p-0 bg-transparent">
                                            View Details →
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
