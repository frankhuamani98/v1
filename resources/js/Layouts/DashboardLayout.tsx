import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar fixed on the left */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main content area with proper margin to avoid sidebar overlap */}
            <div className={cn(
                "flex-1 flex flex-col bg-gray-100 transition-all duration-300",
                "md:ml-64 lg:ml-72" // Add margin equal to sidebar width
            )}>
                <Header toggleSidebar={toggleSidebar} auth={{ user: { username: "defaultUser", email: "default@example.com" } }} />

                {/* Dashboard content */}
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;