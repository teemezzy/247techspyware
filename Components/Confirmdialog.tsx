"use client";

import React from "react";
import { AlertTriangle, Edit2, Plus, Trash2 } from "lucide-react";

export type ConfirmDialogType = "delete" | "edit" | "create" | null;

interface ConfirmDialogProps {
  isOpen: boolean;
  type: ConfirmDialogType;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  type,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !type) return null;

  const content = (() => {
    switch (type) {
      case "delete":
        return {
          icon: <Trash2 className="w-10 h-10 text-red-600" />,
          iconBg: "bg-red-100",
          title: "Delete Post",
          message:
            "Are you sure you want to delete this post? This action cannot be undone.",
          confirmText: "Delete Post",
          confirmClass: "bg-red-600 hover:bg-red-700",
        };
      case "edit":
        return {
          icon: <Edit2 className="w-10 h-10 text-blue-600" />,
          iconBg: "bg-blue-100",
          title: "Edit Post",
          message:
            "You will be redirected to the post editor to make changes.",
          confirmText: "Continue to Editor",
          confirmClass: "bg-blue-600 hover:bg-blue-700",
        };
      case "create":
        return {
          icon: <Plus className="w-10 h-10 text-green-600" />,
          iconBg: "bg-green-100",
          title: "Create New Post",
          message:
            "You will be redirected to the post editor to add the details.",
          confirmText: "Create Post",
          confirmClass: "bg-green-600 hover:bg-green-700",
        };
    }
  })();

  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div
          className={`${content.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {content.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {content.title}
        </h3>
        <p className="text-gray-600 text-center mb-6">{content.message}</p>
        {type === "delete" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">
                This is a permanent action. Deleted posts cannot be recovered.
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors font-medium ${content.confirmClass}`}
          >
            {content.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
