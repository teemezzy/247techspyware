"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import SideBar, { type AdminView } from "@/Components/SideBar";
import { useAuth } from "@/lib/auth";
import Dashboard from "./[section]/Dashboard";
import Posts from "./[section]/Posts";
import Categories from "./[section]/Categories";
import EditorPicks from "./[section]/EditorPicks";
import Users from "./[section]/Users";
import Settings from "./[section]/settings";

type AdminProp = {
  children: ReactNode;
};

export default function Layout({ children }: AdminProp) {
  void children; // layout drives content via activeView
  const router = useRouter();
  const { isAuthenticated, isLoading, isAdmin, user } = useAuth();
  const [activeView, setActiveView] = useState<AdminView>("dashboard");

  // Redirect unauthenticated users to /login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?next=/Admin");
    }
  }, [isLoading, isAuthenticated, router]);

  // If a non-admin is viewing an admin-only section, snap back to a safe one
  useEffect(() => {
    const adminOnly: AdminView[] = ["categories", "editor-picks", "users"];
    if (!isAdmin && adminOnly.includes(activeView)) {
      setActiveView("posts");
    }
  }, [isAdmin, activeView]);

  // Loading or redirecting
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Inactive accounts shouldn't be able to do anything
  if (user && !user.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary text-white p-8">
        <div className="max-w-md text-center bg-white text-gray-800 rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-bold mb-2">Account deactivated</h1>
          <p className="text-gray-600">
            Your account is currently inactive. Please contact an administrator
            to regain access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-secondary">
      <SideBar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 h-screen overflow-y-auto scrollbar-hide bg-secondary">
        <div className="p-6 md:p-12">
          {activeView === "dashboard" && <Dashboard />}
          {activeView === "posts" && <Posts />}
          {activeView === "categories" && isAdmin && <Categories />}
          {activeView === "editor-picks" && isAdmin && <EditorPicks />}
          {activeView === "users" && isAdmin && <Users />}
          {activeView === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}
