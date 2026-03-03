import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-choco-dark text-white/90 py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="text-3xl">🎂</div>
                            <span className="text-2xl font-bold serif tracking-tight text-white">
                                Shower Flour
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/60 mb-8 max-w-xs">
                            Premium baking courses from award-winning Chef Shahma Nazar. Live,
                            recorded, and hybrid programs for every skill level.
                        </p>
                        <div className="flex gap-4">
                            {["📸", "▶️", "💬", "📧"].map((icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold serif text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                            <li><Link href="/courses" className="hover:text-gold transition-colors">Courses</Link></li>
                            <li><Link href="/schedule" className="hover:text-gold transition-colors">Schedule</Link></li>
                            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Learning */}
                    <div>
                        <h4 className="text-white font-bold serif text-lg mb-6">Learning</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><Link href="#" className="hover:text-gold transition-colors">Live Classes</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Recorded Courses</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Hybrid Programs</Link></li>
                            <li><Link href="/dashboard" className="hover:text-gold transition-colors">My Learning</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold serif text-lg mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li><Link href="#" className="hover:text-gold transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Refund Policy</Link></li>
                            <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                    <p>© 2026 Shower Flour. All rights reserved.</p>
                    <p>hello@showerflour.com · +91 98765 43210</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
