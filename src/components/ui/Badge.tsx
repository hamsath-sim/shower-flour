import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "live" | "recorded" | "hybrid" | "gold" | "outline";
}

function Badge({ className, variant = "outline", ...props }: BadgeProps) {
    const variants = {
        live: "bg-[#FFE4E8] text-[#C73B5A]",
        recorded: "bg-[#E4EDFF] text-[#3B6AC7]",
        hybrid: "bg-[#E4FFE9] text-[#2E9E45]",
        gold: "bg-gold-light text-[#7A5B20]",
        outline: "border border-cream-dark text-text-light",
    };

    return (
        <div
            className={cn(
                "inline-block rounded-full px-3 py-1 text-[10px] font-bold text-wide uppercase tracking-widest",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
