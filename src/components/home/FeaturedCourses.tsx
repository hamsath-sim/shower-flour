import { Badge, BadgeProps } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";

const featured = [
    {
        id: "1",
        title: "Luxury Cake Design Masterclass",
        type: "LIVE",
        level: "Intermediate",
        price: 5999,
        oldPrice: 8999,
        thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000",
        sessions: 8,
        duration: "4 Weeks",
    },
    {
        id: "2",
        title: "Artisan Sourdough & Bread Art",
        type: "HYBRID",
        level: "Beginner",
        price: 4499,
        oldPrice: 5499,
        thumbnail: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=1000",
        sessions: 6,
        duration: "3 Weeks",
    },
    {
        id: "3",
        title: "French Pastry: The Croissant Art",
        type: "RECORDED",
        level: "Intermediate",
        price: 3499,
        oldPrice: 4999,
        thumbnail: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000",
        sessions: 12,
        duration: "Lifetime",
    }
];

const FeaturedCourses = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Student Favorites</span>
                        <h2 className="text-4xl md:text-5xl font-bold serif text-chocolate leading-tight">Featured Baking Courses</h2>
                        <p className="text-chocolate/60 mt-4 text-lg">Meticulously designed programs to take you from a home cook to a master baker.</p>
                    </div>
                    <Button variant="outline">View All Courses</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featured.map((course) => (
                        <Card key={course.id} className="group border border-cream-dark">
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
                                    <span className="text-xs text-chocolate/40 font-bold ml-1">(120+)</span>
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
            </div>
        </section>
    );
};

export default FeaturedCourses;
