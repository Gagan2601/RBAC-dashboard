'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MainNav() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {
            href: "/permissions",
            label: "Permissions",
            active: pathname === "/permissions",
        }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="flex items-center justify-between p-4">
            <button
                className="md:hidden p-1 mr-4"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <X className="h-6 w-6 text-black dark:text-white" /> : <Menu className="h-6 w-6 text-black dark:text-white" />}
            </button>
            <h1 className="text-xl font-bold ml-0 mr-6">Admin</h1>
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
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
            </div>
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 transition-all ease-in-out duration-300 ${isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu}>
                        <X className="h-6 w-6 text-black dark:text-white" />
                    </button>
                </div>

                <div className="flex flex-col items-center space-y-6 mt-8">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "text-lg font-medium transition-colors hover:text-primary",
                                route.active ? "text-black dark:text-white" : "text-muted-foreground"
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
