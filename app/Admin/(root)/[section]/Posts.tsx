"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Edit2,
  Eye,
  Loader2,
  Plus,
  Search,
  Tag,
  Trash2,
  User,
} from "lucide-react";
import PostEditor from "@/Components/PostEditor";
import ConfirmDialog from "@/Components/Confirmdialog";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { Category, Post } from "@/lib/types";

const Posts = () => {
  const { user, isAdmin } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "earliest">("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "create" | "edit" | null;
    postId?: number;
  }>({ isOpen: false, type: null });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsRes, cats] = await Promise.all([
        api.listAllPosts({ per_page: 100 }),
        api.listCategories(),
      ]);
      setPosts(postsRes.data);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  // Authors only see their own posts in the table; admins see everything.
  const visiblePosts = useMemo(() => {
    if (isAdmin) return posts;
    return posts.filter((p) => p.author_id === user?.id);
  }, [posts, isAdmin, user]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return [...visiblePosts]
      .filter((post) => {
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          (post.author?.display_name ?? "").toLowerCase().includes(q) ||
          (post.category?.name ?? "").toLowerCase().includes(q);

        const matchesCategory =
          selectedCategory === "all" ||
          post.category?.slug === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const da = new Date(a.created_at).getTime();
        const db = new Date(b.created_at).getTime();
        return sortOrder === "latest" ? db - da : da - db;
      });
  }, [visiblePosts, searchQuery, selectedCategory, sortOrder]);

  // Stats reflect the slice of posts the current user can see.
  const stats = useMemo(
    () => ({
      total: visiblePosts.length,
      views: visiblePosts.reduce((sum, p) => sum + (p.view_count || 0), 0),
      scheduled: visiblePosts.filter((p) => p.status === "scheduled").length,
      drafts: visiblePosts.filter((p) => p.status === "draft").length,
    }),
    [visiblePosts]
  );

  const handleCreate = () =>
    setConfirmDialog({ isOpen: true, type: "create" });

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setConfirmDialog({ isOpen: true, type: "edit", postId: post.id });
  };

  const handleDelete = (postId: number) =>
    setConfirmDialog({ isOpen: true, type: "delete", postId });

  const confirmAction = async () => {
    const dialog = confirmDialog;
    setConfirmDialog({ isOpen: false, type: null });

    if (dialog.type === "delete" && dialog.postId) {
      try {
        await api.deletePost(dialog.postId);
        setPosts((curr) => curr.filter((p) => p.id !== dialog.postId));
      } catch (err) {
        setError(
          err instanceof ApiError ? err.message : "Could not delete post"
        );
      }
    } else if (dialog.type === "create") {
      setEditingPost(null);
      setIsEditing(true);
    } else if (dialog.type === "edit") {
      setIsEditing(true);
    }
  };

  const handleSaved = (saved: Post) => {
    setPosts((curr) => {
      const idx = curr.findIndex((p) => p.id === saved.id);
      if (idx === -1) return [saved, ...curr];
      const next = [...curr];
      next[idx] = saved;
      return next;
    });
    setIsEditing(false);
    setEditingPost(null);
  };

  const canEdit = (post: Post) => isAdmin || post.author_id === user?.id;

  if (isEditing) {
    return (
      <div className="flex items-start justify-center mx-auto">
        <PostEditor
          post={editingPost}
          categories={categories}
          onSaved={handleSaved}
          onCancel={() => {
            setIsEditing(false);
            setEditingPost(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-6 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Management
          </h1>
          <p className="text-gray-600">
            {isAdmin
              ? "Manage all blog posts, drafts, and scheduled publications."
              : "Manage the posts you've authored."}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatTile
            label="Total Posts"
            value={stats.total}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            icon={<Tag className="w-5 h-5" />}
          />
          <StatTile
            label="Total Views"
            value={stats.views}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            icon={<Eye className="w-5 h-5" />}
          />
          <StatTile
            label="Scheduled"
            value={stats.scheduled}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatTile
            label="Drafts"
            value={stats.drafts}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            icon={<User className="w-5 h-5" />}
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "earliest")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="latest">Latest First</option>
              <option value="earliest">Earliest First</option>
            </select>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 bg-primary text-secondary px-5 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors font-medium whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3">
                        <div className="font-medium text-gray-900 line-clamp-1 max-w-md">
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-md">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {post.author?.display_name ?? "—"}
                      </td>
                      <td className="px-6 py-3">
                        {post.category ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {post.category.name}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Uncategorised
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {post.view_count.toLocaleString()}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={post.status} />
                        {post.status === "scheduled" && post.scheduled_for && (
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(post.scheduled_for).toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {canEdit(post) && (
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit post"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete post (admin only)"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No posts found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        type={confirmDialog.type}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
      />
    </div>
  );
};

interface StatTileProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}
const StatTile = ({ label, value, icon, iconBg, iconColor }: StatTileProps) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-900">
        {value.toLocaleString()}
      </p>
    </div>
    <div className={`${iconBg} ${iconColor} p-2 rounded-lg`}>{icon}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-800",
    scheduled: "bg-orange-100 text-orange-800",
    offline: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status] ?? "bg-gray-100 text-gray-800"}`}
    >
      {status}
    </span>
  );
};

export default Posts;
