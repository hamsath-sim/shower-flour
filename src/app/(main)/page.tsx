import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import AboutChef from "@/components/home/AboutChef";
import HowItWorks from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Marquee/Strip */}
      <div className="bg-chocolate py-4 overflow-hidden border-y border-choco-dark/50">
        <div className="flex gap-12 animate-marquee whitespace-nowrap px-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-gold font-bold text-sm tracking-widest uppercase">✦ Luxury Cake Design</span>
              <span className="text-white/40 font-bold text-sm tracking-widest uppercase">✦ French Pastry Masterclass</span>
              <span className="text-gold font-bold text-sm tracking-widest uppercase">✦ Artisan Sourdough</span>
            </div>
          ))}
        </div>
      </div>

      <FeaturedCourses />
      <HowItWorks />
      <AboutChef />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl bg-linear-to-br from-chocolate to-choco-dark p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold serif text-white mb-8">Ready to start your <span className="italic text-gold">baking journey?</span></h2>
              <p className="text-gold/60 text-lg mb-10 max-w-2xl mx-auto">
                Join our next batch and learn the professional techniques used by master pâtissiers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button variant="gold" size="lg">Browse All Courses</Button>
                <Button variant="outline" size="lg" className="border-gold/30 text-gold hover:bg-gold hover:text-chocolate">Get in Touch</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Strip */}
      <section className="py-12 bg-cream border-t border-cream-dark">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-widest text-chocolate/40 uppercase mb-8">Follow our journey @showerflourbakes</p>
          <div className="flex flex-wrap justify-center gap-16 lg:gap-32 opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-2xl font-bold serif text-chocolate">Instagram</span>
            <span className="text-2xl font-bold serif text-chocolate">YouTube</span>
            <span className="text-2xl font-bold serif text-chocolate">WhatsApp</span>
            <span className="text-2xl font-bold serif text-chocolate">TikTok</span>
          </div>
        </div>
      </section>
    </>
  );
}
