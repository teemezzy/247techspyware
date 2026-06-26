"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  Plus,
  Power,
  PowerOff,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { User } from "@/lib/types";

const Users = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form state. The only role we can create is "author" — single-admin rule.
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  // Reset password modal
  const [resettingFor, setResettingFor] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      setUsers(await api.listUsers());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const created = await api.createUser({
        email: email.trim(),
        password,
        display_name: displayName.trim(),
        role: "author",
      });
      setUsers((curr) => [...curr, created]);
      setShowForm(false);
      setEmail("");
      setDisplayName("");
      setPassword("");
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Could not create user"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (u: User) => {
    try {
      const updated = await api.toggleUserActive(u.id);
      setUsers((curr) => curr.map((x) => (x.id === updated.id ? updated : x)));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not update user"
      );
    }
  };

  const handleDelete = async (u: User) => {
    if (
      !confirm(
        `Permanently delete ${u.display_name} (${u.email})? This cannot be undone.`
      )
    )
      return;
    try {
      await api.deleteUser(u.id);
      setUsers((curr) => curr.filter((x) => x.id !== u.id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not delete user"
      );
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingFor) return;
    if (newPassword.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await api.updateUser(resettingFor.id, { password: newPassword });
      setResettingFor(null);
      setNewPassword("");
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Could not reset password"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-3xl p-6 min-h-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Users</h1>
            <p className="text-gray-600">
              Create authors, change roles, and toggle access. Authors can
              write and edit their own posts but can&apos;t delete or assign
              accounts.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-secondary px-5 py-2.5 rounded-lg hover:bg-secondary hover:text-white font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((u) => {
                    const isSelf = u.id === currentUser?.id;
                    const isAdmin = u.role === "admin";
                    // The admin account is locked: no role change, no
                    // deactivate, no delete. The rule is enforced server-side
                    // too — these flags just stop the UI from offering it.
                    const lockActions = isSelf || isAdmin;
                    return (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900">
                          {u.display_name}
                          {isSelf && (
                            <span className="ml-2 text-xs text-primary font-bold">
                              (you)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {u.email}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              isAdmin
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              u.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {u.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setResettingFor(u)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                              title="Reset password"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleActive(u)}
                              disabled={lockActions}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                              title={
                                isAdmin
                                  ? "Admin account cannot be deactivated"
                                  : u.is_active
                                  ? "Deactivate account"
                                  : "Activate account"
                              }
                            >
                              {u.is_active ? (
                                <PowerOff className="w-4 h-4" />
                              ) : (
                                <Power className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(u)}
                              disabled={lockActions}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                              title={
                                isAdmin
                                  ? "Admin account cannot be deleted"
                                  : "Delete user"
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No users yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create user modal */}
      {showForm && (
        <Modal title="Add User" onClose={() => setShowForm(false)}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Password
              </label>
              <input
                type="text"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Share this with them and ask them to log in. Then they can be
                given a fresh password from the Reset action.
              </p>
            </div>
            <p className="text-xs text-gray-500">
              New users are created as <strong>Authors</strong>. They can write
              and edit their own posts but can&apos;t access user management or
              delete content.
            </p>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-2">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-white font-medium disabled:opacity-50"
              >
                {submitting ? "Creating…" : "Create user"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reset password modal */}
      {resettingFor && (
        <Modal
          title={`Reset password for ${resettingFor.display_name}`}
          onClose={() => {
            setResettingFor(null);
            setNewPassword("");
            setFormError(null);
          }}
        >
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="text"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Make sure to share it with the user securely.
              </p>
            </div>
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-2">
                {formError}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setResettingFor(null);
                  setNewPassword("");
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-primary text-secondary rounded-lg hover:bg-secondary hover:text-white font-medium disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Reset password"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Users;
