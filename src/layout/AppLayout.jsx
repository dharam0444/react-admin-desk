import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/utils/context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

export function AppLayout() {
  const { isLogin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="d-flex flex-column vh-100">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="d-flex flex-grow-1">
        {isLogin && <Sidebar isOpen={isSidebarOpen} />}
        <main
          className="flex-grow-1 overflow-auto bg-light"
          style={{
            paddingTop: "60px",
            marginLeft: isLogin ? (isSidebarOpen ? "250px" : "0px") : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
