import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Image as ImageIcon, ToggleLeft, ToggleRight, Clock } from 'lucide-react';

interface PostWithMetrics {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  excerpt: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
}

interface PostEditorProps {
  post: PostWithMetrics | null;
  onSave: (post: PostWithMetrics) => void;
  onCancel: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<PostWithMetrics>>({
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    category: 'TECHNOLOGY',
    featured: false,
    excerpt: '',
    content: '',
    views: 0,
    likes: 0,
    comments: 0,
    status: 'draft',
    scheduledDate: undefined
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState<'publish' | 'schedule'>('publish');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
      setImagePreview(post.image);
    }
  }, [post]);

  const categories = [
    'TECHNOLOGY',
    'AI',
    'HARDWARE',
    'SOFTWARE',
    'MOBILE',
    'GAMING',
    'AUTOMOTIVE',
    'SPACE',
    'AVIATION',
    'ECOMMERCE',
    'SOCIAL MEDIA',
    'ENTERTAINMENT'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, image: value }));
    setImagePreview(value);
  };

  const toggleFeatured = () => {
    setFormData(prev => ({ ...prev, featured: !prev.featured }));
  };

  const handleStatusChange = (status: 'published' | 'draft' | 'scheduled') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = (type: 'publish' | 'schedule') => {
    setConfirmType(type);
    setShowConfirm(true);
  };

  const confirmSave = () => {
    let postStatus: 'published' | 'draft' | 'scheduled' = 'draft';
    let scheduleDate = undefined;

    if (confirmType === 'publish') {
      postStatus = 'published';
    } else if (confirmType === 'schedule') {
      postStatus = 'scheduled';
      scheduleDate = formData.scheduledDate;
    }

    const postToSave: PostWithMetrics = {
      id: post?.id || 0,
      title: formData.title || '',
      author: formData.author || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      image: formData.image || '',
      category: formData.category || 'TECHNOLOGY',
      featured: formData.featured || false,
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      views: formData.views || 0,
      likes: formData.likes || 0,
      comments: formData.comments || 0,
      status: postStatus,
      scheduledDate: scheduleDate
    };

    onSave(postToSave);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen rounded-4xl w-5xl bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto items-center justify-center py-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {post ? 'Edit Post' : 'Create New Post'}
              </h1>
              <p className="text-gray-600 mt-1">
                {post ? 'Make changes to your existing post' : 'Fill in the details to create a new post'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleStatusChange('draft')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                formData.status === 'draft'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('schedule')}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Clock className="w-5 h-5" />
              Schedule Publish
            </button>
            <button
              onClick={() => handleSubmit('publish')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              {post ? 'Update Post' : 'Publish Now'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              required
            />
          </div>

          {/* Author & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Category & Editor's Pick */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Editor's Pick
              </label>
              <button
                type="button"
                onClick={toggleFeatured}
                className={`flex items-center gap-3 w-full px-4 py-3 border-2 rounded-lg transition-all ${
                  formData.featured
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                {formData.featured ? (
                  <>
                    <ToggleRight className="w-6 h-6 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Featured Post</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600">Not Featured</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL *
            </label>
            <div className="space-y-3">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {imagePreview && (
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
              {!imagePreview && (
                <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Image preview will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief summary of the post..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.excerpt?.length || 0} characters
            </p>
          </div>

          {/* Scheduled Publish Date */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Schedule Publication
                </h3>
                <p className="text-sm text-gray-600">
                  Set a future date and time for this post to be automatically published.
                  Leave empty to publish immediately.
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date & Time
              </label>
              <input
                type="datetime-local"
                name="scheduledDate"
                value={formData.scheduledDate || ''}
                onChange={handleInputChange}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-600 mt-2">
                {formData.scheduledDate ? (
                  <>
                    Post will be published on{' '}
                    <strong>
                      {new Date(formData.scheduledDate).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </strong>
                  </>
                ) : (
                  'No scheduled date set. Click "Schedule Publish" to set one.'
                )}
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here... You can use HTML tags for formatting."
              rows={16}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Supports HTML formatting
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSubmit('schedule')}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <Clock className="w-5 h-5" />
                Schedule Publish
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('publish')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                {post ? 'Save Changes' : 'Publish Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className={`${
              confirmType === 'schedule' ? 'bg-orange-100' : 'bg-blue-100'
            } w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {confirmType === 'schedule' ? (
                <Clock className={`w-8 h-8 ${
                  confirmType === 'schedule' ? 'text-orange-600' : 'text-blue-600'
                }`} />
              ) : (
                <Save className="w-8 h-8 text-blue-600" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {confirmType === 'schedule' 
                ? 'Schedule Post Publication' 
                : post 
                  ? 'Confirm Update' 
                  : 'Confirm Publication'}
            </h3>
            
            <p className="text-gray-600 text-center mb-4">
              {confirmType === 'schedule' 
                ? formData.scheduledDate
                  ? `This post will be automatically published on ${new Date(formData.scheduledDate).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}.`
                  : 'Please set a scheduled date and time before scheduling.'
                : post
                  ? 'Are you sure you want to save changes to this post?'
                  : 'Are you sure you want to publish this post now?'}
            </p>

            {confirmType === 'schedule' && !formData.scheduledDate && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-800">
                  ⚠️ No scheduled date set. Please select a date and time in the form above.
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                disabled={confirmType === 'schedule' && !formData.scheduledDate}
                className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${
                  confirmType === 'schedule'
                    ? 'bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 disabled:cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {confirmType === 'schedule' 
                  ? 'Schedule Post' 
                  : post 
                    ? 'Save Changes' 
                    : 'Publish Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;