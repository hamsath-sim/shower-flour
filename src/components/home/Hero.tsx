import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-cream">
            {/* Decorative Elements */}
            <div className="absolute top-20 -left-20 w-96 h-96 bg-blush/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10 text-center lg:text-left">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blush/30 text-rose font-bold text-xs tracking-widest uppercase mb-6 animate-fade-in">
                        ✦ Welcome to Shower Flour
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold serif text-chocolate leading-tight mb-8">
                        Bake Your <br />
                        <span className="italic text-mocha">Masterpiece</span>
                    </h1>
                    <p className="text-lg md:text-xl text-chocolate/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                        Join award-winning Chef <span className="text-rose font-bold">Shahma Nazar</span> for intimate, expert-led
                        baking courses that transform your kitchen into a professional pâtisserie.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                        <Button size="lg" className="bg-chocolate hover:bg-choco-dark">
                            Explore Courses →
                        </Button>
                        <Button variant="outline" size="lg">
                            Meet the Chef
                        </Button>
                    </div>

                    <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                        <span className="text-sm font-bold tracking-widest uppercase text-chocolate/50">As seen on:</span>
                        <div className="text-2xl font-bold">BBC</div>
                        <div className="text-2xl font-bold italic">Vogue</div>
                        <div className="text-2xl font-bold serif">BakeOff</div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative w-full aspect-square rounded-full border-[1.5rem] border-white shadow-2xl overflow-hidden animate-float">
                        <Image
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200"
                            alt="Professional Baking"
                            width={1200}
                            height={1200}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Floating Badges */}
                    <div className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-xl">🏆</div>
                        <div>
                            <p className="text-xs font-bold text-chocolate/40 uppercase tracking-tighter">Award Winning</p>
                            <p className="font-bold serif text-chocolate">Chef Selection</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -left-6 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-rose/20 flex items-center justify-center text-xl">👩‍🏫</div>
                        <div>
                            <p className="text-xs font-bold text-chocolate/40 uppercase tracking-tighter">Enrollment</p>
                            <p className="font-bold serif text-chocolate">2,400+ Students</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
