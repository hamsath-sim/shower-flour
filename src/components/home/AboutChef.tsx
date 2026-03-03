import { Button } from "@/components/ui/Button";
import Image from "next/image";

const AboutChef = () => {
    return (
        <section className="py-24 bg-cream overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose/10 rounded-full blur-2xl" />
                        <div className="relative z-10 rounded-2xl border-[1rem] border-white shadow-2xl overflow-hidden aspect-[4/5]">
                            <Image
                                src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?auto=format&fit=crop&q=80&w=1000"
                                alt="Chef Shahma Nazar"
                                width={1000}
                                height={1250}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Signature overlay */}
                        <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs transform rotate-2">
                            <p className="serif text-rose text-3xl mb-2 font-bold italic">Shahma Nazar</p>
                            <p className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Founder & Head Chef</p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Meet Your Instructor</span>
                        <h2 className="text-4xl md:text-5xl font-bold serif text-chocolate leading-tight mb-8">
                            Baking is a Science, <br />
                            <span className="italic text-mocha">Decorating is Art</span>
                        </h2>
                        <div className="space-y-6 text-chocolate/70 text-lg leading-relaxed mb-10">
                            <p>
                                With over <span className="text-chocolate font-bold">12 years of professional experience</span> and a
                                distinguished alum of <span className="text-rose font-semibold italic">Le Cordon Bleu</span>,
                                Chef Shahma Nazar has dedicated her life to the craft of fine pastry.
                            </p>
                            <p>
                                Shower Flour was born from a simple mission: to make world-class baking techniques accessible
                                to everyone. We don&apos;t just teach recipes; we teach the &quot;why&quot; behind every fold, whisk, and temper.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <p className="text-3xl font-bold serif text-chocolate">150+</p>
                                <p className="text-xs font-bold tracking-widest text-rose uppercase">Courses Hosted</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold serif text-chocolate">25k+</p>
                                <p className="text-xs font-bold tracking-widest text-rose uppercase">Instagram Family</p>
                            </div>
                        </div>

                        <Button variant="outline" size="lg">Read Full Story</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutChef;
