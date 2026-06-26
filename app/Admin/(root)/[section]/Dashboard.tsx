"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Eye,
  FileText,
  Loader2,
  Mail,
  PenSquare,
  Tag,
  Users as UsersIcon,
} from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { DashboardStats } from "@/lib/types";

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  formatter?: (n: number) => string;
}

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const s = await api.getStats();
        if (!cancelled) setStats(s);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Could not load dashboard stats"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  if (!isAdmin) {
    // Authors get a friendly welcome instead of admin-only stats
    return (
      <div className="bg-white rounded-2xl p-10 shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.display_name}
        </h1>
        <p className="text-gray-600 mb-6">
          Head over to <strong>Posts</strong> to write a new article or pick up
          where you left off.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <PenSquare className="w-8 h-8 text-primary mb-3" />
            <h2 className="font-semibold text-gray-900 mb-1">
              Write an article
            </h2>
            <p className="text-sm text-gray-600">
              Create a draft, publish it, or schedule it for later.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h2 className="font-semibold text-gray-900 mb-1">
              Edit your drafts
            </h2>
            <p className="text-sm text-gray-600">
              Only you and admins can see your unpublished work.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
        {error}
      </div>
    );
  }

  if (!stats) return null;

  const cards: StatCard[] = [
    {
      label: "Total Posts",
      value: stats.total_posts,
      icon: <Tag className="w-6 h-6" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Published",
      value: stats.published_posts,
      icon: <FileText className="w-6 h-6" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Drafts",
      value: stats.draft_posts,
      icon: <PenSquare className="w-6 h-6" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Scheduled",
      value: stats.scheduled_posts,
      icon: <Calendar className="w-6 h-6" />,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Views",
      value: stats.total_views,
      icon: <Eye className="w-6 h-6" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      formatter: (n) => n.toLocaleString(),
    },
    {
      label: "Subscribers",
      value: stats.total_subscribers,
      icon: <Mail className="w-6 h-6" />,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      label: "Authors",
      value: stats.total_authors,
      icon: <UsersIcon className="w-6 h-6" />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.display_name}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {card.formatter
                  ? card.formatter(card.value)
                  : card.value.toLocaleString()}
              </p>
            </div>
            <div className={`${card.iconBg} ${card.iconColor} p-3 rounded-lg`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
