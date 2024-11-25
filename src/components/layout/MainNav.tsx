'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MainNav() {
    const pathname = usePathname();

    const routes = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/",
        },
        {
            href: "/users",
            label: "Users",
            active: pathname === "/users",
        },
        {
            href: "/roles",
            label: "Roles",
            active: pathname === "/roles",
        },
    ];

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "relative text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                    {route.active && (
                        <span className="absolute left-0 bottom-0 h-[2px] w-full bg-primary animate-slide-in" />
                    )}
                </Link>
            ))}
        </nav>
    );
}
