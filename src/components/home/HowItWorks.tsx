const steps = [
    {
        num: "01",
        title: "Choose Your Path",
        desc: "Browse our curated collection of Live, Recorded, and Hybrid masterclasses tailored for all levels.",
        icon: "🍰"
    },
    {
        num: "02",
        title: "Learn & Interact",
        desc: "Get hands-on instruction with intimate batch sizes and real-time guidance from the chef.",
        icon: "👩‍🍳"
    },
    {
        num: "03",
        title: "Master the Craft",
        desc: "Complete your coursework, receive your certificate, and join our global community of alumni.",
        icon: "✨"
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white border-y border-cream-dark">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ Simple & Seamless</span>
                    <h2 className="text-4xl md:text-5xl font-bold serif text-chocolate">The Shower Flour Journey</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {steps.map((step) => (
                        <div key={step.num} className="relative group text-center lg:text-left">
                            <div className="text-6xl mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6 inline-block">
                                {step.icon}
                            </div>
                            <div className="absolute top-0 right-0 lg:-right-4 text-6xl font-black serif text-cream-dark/40 group-hover:text-gold/20 transition-colors">
                                {step.num}
                            </div>
                            <h3 className="text-2xl font-bold serif text-chocolate mb-4">{step.title}</h3>
                            <p className="text-chocolate/60 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
