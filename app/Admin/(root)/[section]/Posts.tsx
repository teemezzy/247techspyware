import React, { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Calendar, User, Tag } from 'lucide-react';
import PostEditor from '@/Components/PostEditor';
import ConfirmDialog from '@/Components/Confirmdialog';
import { stories as initialStories } from '@/Constants/Stories'

// Extended post data with admin metrics
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

const Posts = () => {
  // Add metrics to existing posts
  const [posts, setPosts] = useState<PostWithMetrics[]>(
    initialStories.map(post => ({
      ...post,
      views: Math.floor(Math.random() * 50000) + 5000,
      likes: Math.floor(Math.random() * 2000) + 100,
      comments: Math.floor(Math.random() * 500) + 20,
      status: 'published' as const,
      scheduledDate: undefined
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'latest' | 'earliest'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<PostWithMetrics | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'delete' | 'edit' | 'create' | null;
    postId?: number;
  }>({ isOpen: false, type: null });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

  // Calculate total stats
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalPosts = posts.length;
  const featuredPosts = posts.filter(p => p.featured).length;
  const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;

  const handleCreatePost = () => {
    setConfirmDialog({ isOpen: true, type: 'create' });
  };

  const handleEditPost = (post: PostWithMetrics) => {
    setEditingPost(post);
    setConfirmDialog({ isOpen: true, type: 'edit', postId: post.id });
  };

  const handleDeletePost = (postId: number) => {
    setConfirmDialog({ isOpen: true, type: 'delete', postId });
  };

  const confirmAction = () => {
    if (confirmDialog.type === 'delete' && confirmDialog.postId) {
      setPosts(posts.filter(p => p.id !== confirmDialog.postId));
    } else if (confirmDialog.type === 'edit' || confirmDialog.type === 'create') {
      setIsEditing(true);
    }
    setConfirmDialog({ isOpen: false, type: null });
  };

  const handleSavePost = (post: PostWithMetrics) => {
    if (post.id) {
      // Update existing post
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      // Create new post
      setPosts([{ ...post, id: Math.max(...posts.map(p => p.id)) + 1 }, ...posts]);
    }
    setIsEditing(false);
    setEditingPost(null);
  };

  if (isEditing) {
    return (
        <div className='flex items-center justify-center mx-auto'>
            <PostEditor
              post={editingPost}
              onSave={handleSavePost}
              onCancel={() => {
                setIsEditing(false);
                setEditingPost(null);
              }}
            />
        </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-6 rounded-4xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Management</h1>
          <p className="text-gray-600">Manage your blog posts, analytics, and content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{totalPosts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled Posts</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledPosts}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Featured Posts</p>
                <p className="text-2xl font-bold text-gray-900">{featuredPosts}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'latest' | 'earliest')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="latest" className='bg-secondary'>Latest First</option>
              <option value="earliest">Earliest First</option>
            </select>

            {/* Create Post Button */}
            <button
              onClick={handleCreatePost}
              className="flex items-center justify-center gap-2 bg-primary text-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors font-medium whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          {post.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Editor's Pick
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <div>{post.likes} likes</div>
                        <div>{post.comments} comments</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : post.status === 'scheduled'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                        {post.status === 'scheduled' && post.scheduledDate && (
                          <div className="text-xs text-gray-600">
                            {new Date(post.scheduledDate).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          type={confirmDialog.type}
          onConfirm={confirmAction}
          onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
        />
    </div>
  );
};

export default Posts;