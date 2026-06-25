import { Menu, LogOut } from "lucide-react";

export default function DashboardHeader({
    isAdmin,
    isMobile,
    toggleSidebar,
    handleLogoutClick,
    handleLogoClick,
}) {
    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50 h-16">
            <div className="flex items-center justify-between h-full w-full px-4">

                <div className="flex items-center gap-2">

                    {isAdmin && (
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-gray-200 hover:border-indigo-300 lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <div
                        onClick={handleLogoClick}
                        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="logo.png"
                            alt="logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                </div>

                {isAdmin && (
                    <button
                        onClick={handleLogoutClick}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-all duration-200 font-medium border-2 border-red-100 hover:border-red-200"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">
                            Logout
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}