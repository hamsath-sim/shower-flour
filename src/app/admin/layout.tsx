import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#FDFCFB] min-h-screen selection:bg-rose/10 selection:text-rose">
            <AdminSidebar />

            {/* Modern Layered Content Workspace */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden bg-cream/30">
                {/* Header/Breadcrumb Bar (Optional future addition) */}
                <div className="h-20 border-b border-cream-dark/10 bg-white flex items-center px-12 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose shadow-[0_0_10px_rgba(231,76,60,0.3)]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/40">Secure Management Node</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-chocolate serif">Administrator</span>
                            <span className="text-[9px] uppercase tracking-widest text-rose font-bold">Authorized Access</span>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-cream border border-cream-dark flex items-center justify-center text-rose font-bold serif text-lg shadow-sm">
                            A
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    {children}

                    {/* Minimal Internal Footer */}
                    <footer className="px-12 py-10 border-t border-cream-dark/5 flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-chocolate/40">
                            © 2026 Shower Flour Platform • Version 2.1.0-Admin
                        </p>
                        <div className="flex gap-6">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-chocolate/40 cursor-default">Security Protocols Active</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-chocolate/40 cursor-default">Database Sync: OK</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
