// pages/Dashboard.jsx

import { useState, useEffect } from "react";

import CandidateData from "./CandidateData";

import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHero from "../components/DashboardHero";
import DashboardSections from "../components/DashboardSections";
import PaymentStructure from "../components/PaymentStructure";
import ApplicationModal from "../components/ApplicationModal";

import {
    examLocations,
    responsibilities,
    applicationSteps,
    stats,
    highlights,
} from "../data/dashboardData";

export default function Dashboard({
    onLogout,
    username = "Admin",
    isAuthenticated = false,
    userRole = "admin",
}) {
    const [activeTab, setActiveTab] = useState("home");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] =
        useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFormActive, setIsFormActive] = useState(false);

    const isAdmin = userRole === "admin";
    const isUser = userRole === "user";

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;

            setIsMobile(mobile);

            if (!mobile && isAdmin) {
                setIsSidebarOpen(true);
            }
        };

        checkMobile();

        window.addEventListener(
            "resize",
            checkMobile
        );

        return () =>
            window.removeEventListener(
                "resize",
                checkMobile
            );
    }, [isAdmin]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
    };

    const handleLogoClick = () => {
        setActiveTab("home");
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === "form") {
            setIsFormActive(true);
        }

        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const openApplicationForm = () => {
        setIsFormActive(true);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-50">

            {/* Header */}
            <DashboardHeader
                isAdmin={isAdmin}
                isMobile={isMobile}
                toggleSidebar={toggleSidebar}
                handleLogoutClick={handleLogoutClick}
                handleLogoClick={handleLogoClick}
            />

            {/* Sidebar */}
            {isAdmin && (
                <DashboardSidebar
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    isSidebarOpen={isSidebarOpen}
                    isSidebarCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    toggleSidebarCollapse={toggleSidebarCollapse}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
            )}

            {/* Main Content */}
            <div
                className={`transition-all duration-300
                ${isAdmin &&
                        !isMobile &&
                        isSidebarOpen &&
                        !isSidebarCollapsed
                        ? "lg:ml-72"
                        : ""
                    }

                ${isAdmin &&
                        !isMobile &&
                        isSidebarOpen &&
                        isSidebarCollapsed
                        ? "lg:ml-20"
                        : ""
                    }
                `}
            >
                <div className="pt-20 px-4 md:px-6 pb-8">

                    {/* Home */}
                    {activeTab === "home" && (
                        <div className="max-w-7xl mx-auto">

                            <DashboardHero
                                username={username}
                                stats={stats}
                                openApplicationForm={
                                    openApplicationForm
                                }
                                isGuest={!isAuthenticated}
                                title={
                                    isUser
                                        ? "User Dashboard"
                                        : "Dashboard"
                                }
                            />

                            <DashboardSections
                                examLocations={examLocations}
                                responsibilities={
                                    responsibilities
                                }
                                applicationSteps={
                                    applicationSteps
                                }
                                keyHighlights={highlights}
                                openApplicationForm={
                                    openApplicationForm
                                }
                            />

                            <PaymentStructure />
                        </div>
                    )}

                    {/* Candidate Data */}
                    {activeTab === "applications" && (
                        <div className="max-w-7xl mx-auto">
                            <CandidateData />
                        </div>
                    )}
                </div>
            </div>

            {/* Form Modal */}
            <ApplicationModal
                isOpen={isFormActive}
                onClose={() => {
                    setIsFormActive(false);
                    setActiveTab("home");
                }}
            />
        </div>
    );
}