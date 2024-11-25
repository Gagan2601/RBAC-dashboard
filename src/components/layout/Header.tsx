import { MainNav } from "@/components/layout/MainNav";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <h1 className="text-xl font-bold mr-6">RBAC Admin</h1>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon">
                        <UserCircle className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}