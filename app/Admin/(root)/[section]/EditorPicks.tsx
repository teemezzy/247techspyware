"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Save,
  Star,
  Trash2,
} from "lucide-react";
import { api, ApiError, buildImageUrl } from "@/lib/api";
import type { EditorPick, Post } from "@/lib/types";

const EditorPicks = () => {
  const [picks, setPicks] = useState<EditorPick[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderDirty, setOrderDirty] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [picksRes, postsRes] = await Promise.all([
        api.listEditorPicks(),
        api.listAllPosts({ per_page: 100 }),
      ]);
      const sorted = [...picksRes].sort((a, b) => a.order - b.order);
      setPicks(sorted);
      setAllPosts(postsRes.data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not load editor's picks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const pickedIds = useMemo(
    () => new Set(picks.map((p) => p.post_id)),
    [picks]
  );

  const candidatePosts = useMemo(
    () =>
      allPosts
        .filter(
          (p) => p.status === "published" && !pickedIds.has(p.id)
        )
        .filter((p) =>
          search.trim()
            ? p.title.toLowerCase().includes(search.toLowerCase())
            : true
        ),
    [allPosts, pickedIds, search]
  );

  const handleAdd = async (postId: number) => {
    try {
      const created = await api.addEditorPick(postId);
      // The API doesn't always inline the post; merge in the post locally for display
      const post = allPosts.find((p) => p.id === postId);
      const next = [...picks, { ...created, post: post ?? created.post }];
      setPicks(next);
      setShowPicker(false);
      setSearch("");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not add editor pick"
      );
    }
  };

  const handleRemove = async (pick: EditorPick) => {
    if (!confirm("Remove this post from Editor's Picks?")) return;
    try {
      await api.removeEditorPick(pick.id);
      setPicks((curr) => curr.filter((p) => p.id !== pick.id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not remove editor pick"
      );
    }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...picks];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setPicks(next);
    setOrderDirty(true);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      await api.reorderEditorPicks(
        picks.map((p, idx) => ({ id: p.id, order: idx }))
      );
      setOrderDirty(false);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not save order"
      );
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-6 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
              Editor&apos;s Picks
            </h1>
            <p className="text-gray-600">
              Curate the featured posts shown on the homepage. Reorder by
              moving them up or down.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {orderDirty && (
              <button
                onClick={saveOrder}
                disabled={savingOrder}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {savingOrder ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save order
              </button>
            )}
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-2 bg-primary text-secondary px-5 py-2.5 rounded-lg hover:bg-secondary hover:text-white font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Pick
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : picks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            No editor&apos;s picks yet. Click <strong>Add Pick</strong> to
            choose your first.
          </div>
        ) : (
          <ol className="space-y-3">
            {picks.map((pick, idx) => {
              const post = pick.post ?? allPosts.find((p) => p.id === pick.post_id);
              return (
                <li
                  key={pick.id}
                  className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
                >
                  <div className="flex flex-col items-center justify-center w-8 text-gray-400 font-bold">
                    {idx + 1}
                  </div>
                  {post?.banner_image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={buildImageUrl(post.banner_image)}
                      alt=""
                      className="w-20 h-14 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 line-clamp-1">
                      {post?.title ?? `Post #${pick.post_id}`}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {post?.author?.display_name
                        ? `By ${post.author.display_name} · `
                        : ""}
                      {post?.category?.name ?? "Uncategorised"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(idx, 1)}
                      disabled={idx === picks.length - 1}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemove(pick)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Remove from picks"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Picker modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Add an Editor&apos;s Pick
              </h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search published posts…"
                autoFocus
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {candidatePosts.length === 0 ? (
                <div className="text-center text-gray-500 py-12 text-sm">
                  No published posts available. Publish a post first to feature
                  it.
                </div>
              ) : (
                <ul className="space-y-1">
                  {candidatePosts.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => handleAdd(p.id)}
                        className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      >
                        {p.banner_image && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={buildImageUrl(p.banner_image)}
                            alt=""
                            className="w-16 h-11 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 line-clamp-1">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.category?.name ?? "Uncategorised"}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => {
                  setShowPicker(false);
                  setSearch("");
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPicks;
