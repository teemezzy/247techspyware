"use client";

import React from "react";
import { LogOut } from "lucide-react";
import AdminProfile from "./AdminProfile";
import { useAuth } from "@/lib/auth";

export type AdminView =
  | "dashboard"
  | "posts"
  | "categories"
  | "editor-picks"
  | "users"
  | "settings";

interface SidebarProps {
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
}

const ALL_ITEMS: { key: AdminView; label: string; adminOnly: boolean }[] = [
  { key: "dashboard", label: "Dashboard", adminOnly: false },
  { key: "posts", label: "Posts", adminOnly: false },
  { key: "categories", label: "Categories", adminOnly: true },
  { key: "editor-picks", label: "Editor's Picks", adminOnly: true },
  { key: "users", label: "Users", adminOnly: true },
  { key: "settings", label: "Settings", adminOnly: false },
];

const SideBar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { isAdmin, logout } = useAuth();
  const items = ALL_ITEMS.filter((it) => !it.adminOnly || isAdmin);

  return (
    <aside className="h-screen shrink-0 min-w-[280px] w-1/4 max-w-[340px] bg-secondary text-white flex flex-col py-12 px-10 overflow-y-auto scrollbar-hide">
      <div className="text-2xl font-bold mb-6">
        <AdminProfile />
      </div>

      <nav className="flex flex-col gap-6 pt-8 flex-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveView(item.key)}
            className={`text-left text-xl font-bold py-2 rounded transition-colors ${
              activeView === item.key
                ? "text-primary"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-6 flex items-center gap-2 text-gray-400 hover:text-primary text-base font-medium"
      >
        <LogOut className="w-5 h-5" />
        Sign out
      </button>
    </aside>
  );
};

export default SideBar;
