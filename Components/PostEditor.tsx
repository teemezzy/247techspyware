"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Image as ImageIcon,
  Loader2,
  Save,
  Star,
  Upload,
} from "lucide-react";
import { api, ApiError, buildImageUrl } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type {
  Category,
  CreatePostRequest,
  Post,
  PostStatus,
  UpdatePostRequest,
} from "@/lib/types";

interface PostEditorProps {
  post: Post | null;
  categories: Category[];
  onSaved: (post: Post) => void;
  onCancel: () => void;
}

type Mode = "publish" | "schedule" | "draft";

const PostEditor: React.FC<PostEditorProps> = ({
  post,
  categories,
  onSaved,
  onCancel,
}) => {
  const { isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [makeEditorPick, setMakeEditorPick] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setCategoryId(post.category_id ?? "");
      setBannerImage(post.banner_image);
      setScheduledFor(
        post.scheduled_for ? post.scheduled_for.slice(0, 16) : ""
      );
    }
  }, [post]);

  const validate = (mode: Mode): string | null => {
    if (!title.trim()) return "Title is required";
    if (mode === "schedule" && !scheduledFor)
      return "Pick a date and time to schedule this post";
    return null;
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!post) {
      setError(
        "Save the post as a draft first, then you can attach a banner image."
      );
      return;
    }

    setError(null);
    setUploadingImage(true);
    try {
      const updated = await api.uploadPostImage(post.id, file);
      setBannerImage(updated.banner_image);
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const submit = async (mode: Mode) => {
    const validationError = validate(mode);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      let status: PostStatus = "draft";
      if (mode === "publish") status = "published";
      else if (mode === "schedule") status = "scheduled";

      let saved: Post;

      if (post) {
        const req: UpdatePostRequest = {
          title,
          content,
          excerpt,
          category_id: categoryId === "" ? null : Number(categoryId),
          status,
          scheduled_for:
            mode === "schedule" ? new Date(scheduledFor).toISOString() : null,
        };
        saved = await api.updatePost(post.id, req);
      } else {
        const req: CreatePostRequest = {
          title,
          content,
          excerpt,
          category_id: categoryId === "" ? null : Number(categoryId),
          status,
          scheduled_for:
            mode === "schedule" ? new Date(scheduledFor).toISOString() : null,
        };
        saved = await api.createPost(req);
      }

      // Optionally pin as editor's pick (admin only, on publish)
      if (
        isAdmin &&
        makeEditorPick &&
        (mode === "publish" || mode === "schedule")
      ) {
        try {
          await api.addEditorPick(saved.id);
        } catch (err) {
          // Don't block save on this — surface a soft warning
          // eslint-disable-next-line no-console
          console.warn("Could not add editor pick:", err);
        }
      }

      onSaved(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save post");
    } finally {
      setSubmitting(false);
    }
  };

  const previewSrc = buildImageUrl(bannerImage);

  return (
    <div className="bg-gray-50 rounded-3xl w-full max-w-5xl p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-gray-600 text-sm">
            {post
              ? "Make changes to your existing post"
              : "Fill in the details to create a new post"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title…"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            required
          />
        </div>

        {/* Category & Editor's Pick */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Uncategorised</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">
                No categories yet. Ask an admin to create some under
                Categories.
              </p>
            )}
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Editor&apos;s Pick
              </label>
              <button
                type="button"
                onClick={() => setMakeEditorPick((v) => !v)}
                className={`flex items-center gap-3 w-full px-4 py-3 border-2 rounded-lg transition-all ${
                  makeEditorPick
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    makeEditorPick
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={
                    makeEditorPick ? "font-medium text-yellow-900" : "text-gray-600"
                  }
                >
                  {makeEditorPick
                    ? "Will be added to Editor's Picks on publish"
                    : "Add to Editor's Picks (on publish)"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Banner image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner Image
          </label>
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://… or upload below"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage || !post}
                title={
                  !post
                    ? "Save as draft first to enable image upload"
                    : "Upload an image"
                }
                className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg hover:bg-primary hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImage ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                {uploadingImage ? "Uploading…" : "Upload"}
              </button>
            </div>
            {previewSrc ? (
              <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                {/* Native img keeps things simple for arbitrary remote/relative URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrc}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-56 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Image preview will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt / Meta Description
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a brief summary of the post…"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {excerpt.length} characters
          </p>
        </div>

        {/* Schedule */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
          <div className="flex items-start gap-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Schedule Publication
              </h3>
              <p className="text-sm text-gray-600">
                Set a future date and time to auto-publish. Leave empty to
                publish immediately.
              </p>
            </div>
          </div>
          <input
            type="datetime-local"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here. HTML tags are supported."
            rows={14}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            HTML formatting is supported.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => submit("draft")}
            disabled={submitting}
            className="px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Save as Draft"}
          </button>
          <button
            type="button"
            onClick={() => submit("schedule")}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
          >
            <Clock className="w-5 h-5" />
            Schedule
          </button>
          <button
            type="button"
            onClick={() => submit("publish")}
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-bold disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {post ? "Update & Publish" : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
