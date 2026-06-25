import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  Menu,
  X
} from "lucide-react";
import CandidateData from "./CandidateData"; // Your existing candidate component
import HomePage from "./HomePage"; // Import the HomePage component

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home"); // Set default to "home"
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case "home":
        return <HomePage />;
      case "candidates":
        return <CandidateData />;
      case "reports":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
            <p className="text-gray-600 mt-2">Reports section coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <p className="text-gray-600 mt-2">Settings section coming soon...</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8" />
            {sidebarOpen && <span className="text-xl font-bold">Admin Panel</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-700 border-l-4 border-yellow-500"
                    : "hover:bg-blue-700"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600 rounded-lg transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Admin User</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}