import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-chocolate text-white shadow-sm hover:bg-choco-dark hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(107,58,58,0.35)]",
            secondary: "bg-blush-dark text-white hover:bg-rose hover:-translate-y-0.5",
            gold: "bg-linear-to-br from-gold to-[#B8933E] text-white shadow-[0_4px_20px_rgba(201,169,110,0.4)] hover:-translate-y-0.5",
            outline: "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-white",
            ghost: "text-text-dark hover:bg-cream-dark",
        };

        const sizes = {
            sm: "px-5 py-2 text-xs",
            md: "px-8 py-3.5 text-sm",
            lg: "px-11 py-4.5 text-base",
            icon: "p-2.5",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
