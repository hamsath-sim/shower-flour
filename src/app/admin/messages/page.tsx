import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getContactMessages } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, User, Clock, MessageSquare, Reply, Inbox, MoreVertical, Search, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default async function AdminMessagesPage() {
    const session = await auth();

    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        redirect("/");
    }

    const { messages } = await getContactMessages();

    return (
        <div className="p-12 space-y-10 text-chocolate">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
                        <span className="text-rose font-bold text-[10px] tracking-[0.4em] uppercase">Communication Studio</span>
                    </div>
                    <h1 className="text-4xl font-bold serif">Contact Inquiries</h1>
                    <p className="text-chocolate/60 mt-2 font-medium italic serif text-lg pb-1">Rigorous oversight of all inbound platform communications.</p>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-cream-dark/10 shadow-sm flex items-center gap-6">
                    <div className="flex items-center gap-3 pr-6 border-r border-cream-dark/10">
                        <div className="w-10 h-10 rounded-2xl bg-rose/5 flex items-center justify-center text-rose border border-rose/10">
                            <Inbox className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-chocolate/30">Total queue</p>
                            <p className="text-xl font-bold text-chocolate serif leading-none">{messages?.length ?? 0}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {messages?.map((msg) => (
                    <Card key={msg.id} className="border-none bg-white shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group rounded-[40px]">
                        <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row min-h-[220px]">
                                <div className="lg:w-1/4 p-10 bg-cream/5 border-r border-cream-dark/10 group-hover:bg-rose/[0.02] transition-colors duration-700">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="w-20 h-20 rounded-[32px] bg-white border border-cream-dark/20 flex items-center justify-center text-rose shadow-inner transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                                            <User className="w-10 h-10" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-chocolate text-xl serif leading-tight">{msg.firstName} {msg.lastName}</h3>
                                            <p className="text-[9px] uppercase tracking-widest font-bold text-rose/60">Prospective Student</p>
                                        </div>
                                        <div className="pt-4 w-full">
                                            <Link href={`mailto:${msg.email}`} className="block">
                                                <Button className="w-full bg-chocolate hover:bg-rose text-white text-[10px] uppercase font-bold tracking-widest h-12 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shadow-lg shadow-chocolate/10 hover:shadow-rose/20 active:scale-95 text-white bg-chocolate">
                                                    <Reply className="w-4 h-4" /> Reply Node
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-cream rounded-full border border-cream-dark/20 text-chocolate/50 italic serif text-xs">
                                                    <Mail className="w-3.5 h-3.5 text-rose/40" />
                                                    {msg.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-chocolate/30 uppercase tracking-widest">
                                                    <Clock className="w-4 h-4 text-rose/40" />
                                                    Context Captured: {new Date(msg.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -left-6 top-0 w-1 h-full bg-rose/10 group-hover:bg-rose/40 transition-colors duration-700 rounded-full" />
                                            <p className="text-chocolate/80 text-lg leading-[1.8] serif italic pl-4 text-balance">
                                                "{msg.message}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-3 mt-8 pt-8 border-t border-cream-dark/5">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-chocolate/20 mr-2">Audit Status</span>
                                        <Badge className="bg-green-500/10 text-green-600 border-none italic serif lowercase first-letter:uppercase px-4 py-1.5 shadow-sm">
                                            Received & Archived
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {(!messages || messages.length === 0) && (
                    <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-cream-dark/10 shadow-inner">
                        <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-8 text-chocolate/10">
                            <MessageSquare className="w-12 h-12" />
                        </div>
                        <p className="text-chocolate/30 italic font-medium serif text-3xl">Inquiry queue has been fully resolved.</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-chocolate/20 mt-4 italic">Platform responsiveness: 100%</p>
                    </div>
                )}
            </div>
        </div>
    );
}
