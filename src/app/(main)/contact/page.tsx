"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Phone, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/app/actions";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const result = await submitContactForm(formData);
        if (result.success) {
            setSubmitted(true);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="pt-32 pb-24 bg-cream min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mb-16">
                    <span className="text-rose font-bold text-xs tracking-widest uppercase mb-4 block">✦ We&apos;re Responsive</span>
                    <h1 className="text-5xl font-bold serif text-chocolate mb-4">Get in Touch</h1>
                    <p className="text-chocolate/70 text-lg">
                        Have questions about a course? Need a private workshop? We&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            {[
                                { icon: <MessageSquare className="w-6 h-6" />, title: "Chat with us", detail: "The fastest response. Typically in 30m.", action: "WhatsApp Support", color: "bg-[#E4FFE9] text-[#2E9E45]" },
                                { icon: <Mail className="w-6 h-6" />, title: "Email us", detail: "For collaborations and support.", action: "hello@showerflour.com", color: "bg-[#FFF0F3] text-rose" },
                                { icon: <Phone className="w-6 h-6" />, title: "Call us", detail: "Mon–Sat, 10am – 6pm IST.", action: "+91 98765 43210", color: "bg-[#E4EDFF] text-[#3B6AC7]" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold serif text-chocolate text-xl mb-1">{item.title}</h4>
                                        <p className="text-chocolate/50 text-sm mb-3 font-medium">{item.detail}</p>
                                        <p className="text-rose font-bold cursor-pointer hover:underline">{item.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 rounded-3xl bg-chocolate text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-2xl font-bold serif mb-4">Chef Shahma Nazar</h4>
                                <p className="text-white/60 mb-6 font-medium">Available for private consultations, corporate workshops, and international collaborations.</p>
                                <Button variant="gold" className="w-full">Schedule a Session</Button>
                            </div>
                            <div className="absolute top-0 right-0 p-4 text-4xl opacity-20">👩‍🍳</div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <Card className="rounded-4xl p-10 bg-white border border-cream-dark shadow-2xl">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">First Name</label>
                                        <input name="firstname" type="text" className="w-full bg-cream/30 border border-cream-dark rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium" placeholder="Shahma" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Last Name</label>
                                        <input name="lastname" type="text" className="w-full bg-cream/30 border border-cream-dark rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium" placeholder="Nazar" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Email Address</label>
                                    <input name="email" type="email" className="w-full bg-cream/30 border border-cream-dark rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium" placeholder="shahma@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-chocolate/40 uppercase">Message</label>
                                    <textarea name="message" rows={5} className="w-full bg-cream/30 border border-cream-dark rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-rose/20 outline-none transition-all font-medium resize-none" placeholder="How can we help you bake better?" required />
                                </div>
                                <Button size="lg" className="w-full h-14 text-sm uppercase tracking-widest" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        ) : (
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
                                <div className="text-7xl mb-8">💖</div>
                                <h3 className="text-3xl font-bold serif text-chocolate mb-4">Message Received</h3>
                                <p className="text-chocolate/50 font-medium mb-10 max-w-xs mx-auto">
                                    Thank you for reaching out! Shahma or one of the team members will get back to you within 24 hours.
                                </p>
                                <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                            </motion.div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
