"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, User, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Schedule", href: "/schedule" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-500 py-4",
                scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-3" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="text-2xl transition-transform duration-500 group-hover:rotate-12">🎂</div>
                    <span className="text-xl font-bold serif text-chocolate tracking-tight">
                        Shower Flour
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-semibold transition-colors duration-300 hover:text-rose",
                                pathname === link.href ? "text-rose" : "text-chocolate/70"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {session ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="font-bold text-chocolate hover:text-rose">
                                    My Learning
                                </Button>
                            </Link>
                            <Link href="/profile">
                                <Button variant="primary" size="sm" className="bg-chocolate hover:bg-choco-dark flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Profile
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button variant="primary" size="sm">
                                    Enroll Now
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-chocolate p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-cream-dark md:hidden flex flex-col p-6 gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-semibold serif text-chocolate"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-cream-dark" />
                        {session ? (
                            <div className="flex flex-col gap-3">
                                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full justify-start gap-3 border-cream-dark text-chocolate">
                                        <BookOpen className="w-5 h-5 text-rose" />
                                        My Learning
                                    </Button>
                                </Link>
                                <Link href="/profile" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary" className="w-full justify-start gap-3">
                                        <User className="w-5 h-5" />
                                        Profile
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full border-cream-dark text-chocolate">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/courses" onClick={() => setIsOpen(false)}>
                                    <Button variant="primary" className="w-full">
                                        Enroll Now
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
