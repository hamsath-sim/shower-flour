"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-rose border-rose/20 hover:bg-rose/5 group"
        >
            <LogOut className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Sign Out
        </Button>
    );
}
