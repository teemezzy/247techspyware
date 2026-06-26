"use client";

import React, { useEffect, useState } from "react";
import { Check, Edit2, Loader2, Plus, Trash2, X } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Category } from "@/lib/types";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setCategories(await api.listCategories());
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setCreating(true);
    setError(null);
    try {
      const created = await api.createCategory(name);
      setCategories((curr) => [...curr, created]);
      setNewName("");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not create category"
      );
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (c: Category) => {
    setEditingId(c.id);
    setEditingName(c.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveEdit = async () => {
    if (editingId == null) return;
    const name = editingName.trim();
    if (!name) return;
    try {
      const updated = await api.updateCategory(editingId, name);
      setCategories((curr) =>
        curr.map((c) => (c.id === updated.id ? updated : c))
      );
      cancelEdit();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not update category"
      );
    }
  };

  const handleDelete = async (c: Category) => {
    if (
      !confirm(
        `Delete category "${c.name}"? Posts in this category will become uncategorised.`
      )
    )
      return;
    try {
      await api.deleteCategory(c.id);
      setCategories((curr) => curr.filter((x) => x.id !== c.id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not delete category"
      );
    }
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-6 min-h-full">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Categories</h1>
          <p className="text-gray-600">
            Categories help organise posts on the public site.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow p-4 mb-6 flex gap-3"
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name (e.g. Artificial Intelligence)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={creating || !newName.trim()}
            className="flex items-center gap-2 bg-primary text-secondary px-5 py-2 rounded-lg hover:bg-secondary hover:text-white font-medium disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </form>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      {editingId === c.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          autoFocus
                          className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">
                          {c.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600 font-mono">
                      {c.slug}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === c.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(c)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && categories.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No categories yet. Add one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
