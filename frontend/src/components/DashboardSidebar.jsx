import {
    Home,
    FileText,
    Table,
    Menu,
    X,
    Award,
} from "lucide-react";

export default function DashboardSidebar({
    activeTab,
    handleTabChange,
    isSidebarOpen,
    isSidebarCollapsed,
    isMobile,
    toggleSidebarCollapse,
    setIsSidebarOpen,
}) {
    const menuItems = [
        {
            id: "home",
            label: "Dashboard",
            icon: Home,
        },
        {
            id: "form",
            label: "Application Form",
            icon: FileText,
        },
        {
            id: "applications",
            label: "Candidate Data",
            icon: Table,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
            fixed top-16 left-0 bottom-0
            bg-white/95 backdrop-blur-md
            border-r-2 border-gray-200
            z-50 overflow-y-auto
            transition-all duration-300 ease-in-out

            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

            ${isMobile
                        ? "w-72"
                        : isSidebarCollapsed
                            ? "lg:w-20"
                            : "lg:w-72"
                    }
        `}
            >
                <div className="p-4 min-h-full flex flex-col">

                    {/* Collapse Button */}
                    {!isMobile && (
                        <div className="mb-4 flex justify-start border-b-2 border-gray-200 pb-4">
                            <button
                                onClick={toggleSidebarCollapse}
                                className="ml-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-gray-300 hover:border-indigo-300"
                            >
                                {isSidebarCollapsed ? (
                                    <Menu size={18} />
                                ) : (
                                    <X size={18} />
                                )}
                            </button>
                        </div>
                    )}

                    {/* Menu */}
                    <div className="space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    handleTabChange(item.id);

                                    if (isMobile) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                title={
                                    isSidebarCollapsed && !isMobile
                                        ? item.label
                                        : ""
                                }
                                className={`
                    w-full flex items-center gap-3
                    px-3 py-3 rounded-xl
                    border-2 transition-all duration-200 group

                    ${activeTab === item.id
                                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200"
                                        : "text-gray-700 hover:bg-gray-100 border-gray-200 hover:border-indigo-300"
                                    }

                    ${isSidebarCollapsed && !isMobile
                                        ? "justify-center"
                                        : ""
                                    }
                `}
                            >
                                <item.icon
                                    size={20}
                                    className={`
                    transition-transform group-hover:scale-110

                    ${activeTab === item.id
                                            ? "text-white"
                                            : "text-gray-600"
                                        }
                    `}
                                />

                                {(!isSidebarCollapsed || isMobile) && (
                                    <span className="font-medium text-sm">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Help Card */}
                    {(!isSidebarCollapsed || isMobile) && (
                        <div className="mt-auto pt-6">
                            <div className="p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Award
                                        size={16}
                                        className="text-indigo-600"
                                    />
                                    <p className="text-sm font-semibold text-indigo-600">
                                        Need Help?
                                    </p>
                                </div>

                                <p className="text-xs text-gray-600 mb-3">
                                    Contact our support team
                                </p>

                                <button
                                    className="
                    w-full
                    px-3 py-2
                    bg-white
                    rounded-lg
                    text-xs
                    font-medium
                    text-indigo-600
                    border-2 border-indigo-200
                    hover:shadow-md
                    transition-all
                    "
                                >
                                    support@sulai.com
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Collapsed Footer */}
                    {isSidebarCollapsed && !isMobile && (
                        <div className="mt-auto pt-6 flex justify-center">
                            <div className="p-2 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                                <Award
                                    size={20}
                                    className="text-indigo-600"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}