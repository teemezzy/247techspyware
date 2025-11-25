import React from 'react';
import { AlertTriangle, Edit2, Trash2, Plus, Clock } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  type: 'delete' | 'edit' | 'create' | 'schedule' | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  type,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getDialogContent = () => {
    switch (type) {
      case 'delete':
        return {
          icon: <Trash2 className="w-12 h-12 text-red-600" />,
          iconBg: 'bg-red-100',
          title: 'Delete Post',
          message: 'Are you sure you want to delete this post? This action cannot be undone and all post data will be permanently removed.',
          confirmText: 'Delete Post',
          confirmClass: 'bg-red-600 hover:bg-red-700',
          cancelText: 'Cancel'
        };
      case 'edit':
        return {
          icon: <Edit2 className="w-12 h-12 text-blue-600" />,
          iconBg: 'bg-blue-100',
          title: 'Edit Post',
          message: 'Are you sure you want to edit this post? You will be redirected to the post editor.',
          confirmText: 'Continue to Editor',
          confirmClass: 'bg-blue-600 hover:bg-blue-700',
          cancelText: 'Cancel'
        };
      case 'create':
        return {
          icon: <Plus className="w-12 h-12 text-green-600" />,
          iconBg: 'bg-green-100',
          title: 'Create New Post',
          message: 'You are about to create a new post. You will be redirected to the post editor where you can add all the details.',
          confirmText: 'Create Post',
          confirmClass: 'bg-green-600 hover:bg-green-700',
          cancelText: 'Cancel'
        };
      case 'schedule':
        return {
          icon: <Clock className="w-12 h-12 text-orange-600" />,
          iconBg: 'bg-orange-100',
          title: 'Schedule Post',
          message: 'This post will be scheduled for automatic publication at the specified date and time.',
          confirmText: 'Schedule Post',
          confirmClass: 'bg-orange-600 hover:bg-orange-700',
          cancelText: 'Cancel'
        };
      default:
        return null;
    }
  };

  const content = getDialogContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-secondary/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        {/* Icon */}
        <div className={`${content.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
          {content.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {content.title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {content.message}
        </p>

        {/* Warning for delete */}
        {type === 'delete' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">
                This is a permanent action. Deleted posts cannot be recovered.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {content.cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors font-medium ${content.confirmClass}`}
          >
            {content.confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;