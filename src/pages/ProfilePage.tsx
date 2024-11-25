import { useAuth } from "@/hooks/useAuth.tsx";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { cn } from "@/lib/utils"; // Utility for conditional classNames, often part of ShadCN projects.

export default function ProfilePage() {
    const { logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
        toast({
            title: "Log out successful",
            description: "You have been logged out of your account.",
            variant: "default",
        });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen gap-4">
            <aside
                className={cn(
                    "w-full border-none md:w-64 bg-gray-100 dark:bg-gray-900 md:border-r md:border-gray-200 md:dark:border-gray-700",
                    "p-4 flex flex-col space-y-4"
                )}
            >
                <nav className="space-y-2">
                    <Link
                        to="watchlist"
                        className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Watchlist
                    </Link>
                    <Link
                        to="ratings"
                        className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Ratings
                    </Link>
                </nav>
                <Button onClick={handleLogOut} className="w-full">
                    Log Out
                </Button>
            </aside>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
