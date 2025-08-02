import React, { useState } from 'react';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { Calendar, Edit2, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  onEdit?: (postId: string, newContent: string) => void;
  showActions?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onDelete, 
  onEdit, 
  showActions = true 
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const isOwner = user?._id === post.author._id;

  const handleEdit = () => {
    if (onEdit && editContent.trim()) {
      onEdit(post._id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(post.content);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Link
            to={`/profile/${post.author._id}`}
            className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
          >
            <User className="w-5 h-5 text-blue-600" />
          </Link>
          <div>
            <Link
              to={`/profile/${post.author._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.author.name}
            </Link>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && isOwner && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit post"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(post._id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Post Content */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="What's on your mind?"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={!editContent.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      )}
    </div>
  );
};

export default PostCard;