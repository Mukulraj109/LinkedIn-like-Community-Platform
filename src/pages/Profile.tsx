import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Post } from '../types';
import { userAPI, postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import {
  User as UserIcon,
  Calendar,
  Mail,
  Edit2,
  Save,
  X
} from 'lucide-react';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
  });

  const isOwnProfile = currentUser?._id === userId;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError('');

        const userData = await userAPI.getProfile(userId);
        setUser(userData);
        setEditForm({
          name: userData.name,
          bio: userData.bio || '',
        });
      } catch (error: any) {
        console.error('Error fetching user:', error);
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return;

      try {
        setPostsLoading(true);
        const posts = await postsAPI.getUserPosts(userId);
        setUserPosts(posts);
      } catch (error: any) {
        console.error('Error fetching user posts:', error);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userId) return;

    try {
      const updatedUser = await userAPI.updateProfile(userId, {
        name: editForm.name,
        bio: editForm.bio,
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditForm({
        name: user.name,
        bio: user.bio || '',
      });
    }
    setIsEditing(false);
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(postId);
        setUserPosts(userPosts.filter(post => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEditPost = async (postId: string, newContent: string) => {
    try {
      const updatedPost = await postsAPI.updatePost(postId, newContent);
      setUserPosts(userPosts.map(post =>
        post._id === postId ? updatedPost : post
      ));
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-red-100 text-red-700 border border-red-200 p-4 rounded">
          {error || 'User not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-xl font-semibold border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 w-full"
                    required
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Your bio..."
                    className="w-full border border-gray-300 p-2 rounded resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm flex items-center gap-1">
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button onClick={handleCancelEdit} type="button" className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 text-sm flex items-center gap-1">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="text-xl font-semibold">{user.name}</h1>
                  <div className="text-sm text-gray-600 flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1"><Mail size={16} /> {user.email}</span>
                    <span className="flex items-center gap-1"><Calendar size={16} /> Joined {formatDate(user.createdAt)}</span>
                  </div>
                  {user.bio && <p className="text-gray-700 mt-2 text-sm">{user.bio}</p>}
                </>
              )}
            </div>
          </div>
          {isOwnProfile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">
          {isOwnProfile ? 'Your Posts' : `${user.name}'s Posts`}
        </h2>
        {postsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-center text-gray-500">No posts available.</div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={isOwnProfile ? handleDeletePost : undefined}
                onEdit={isOwnProfile ? handleEditPost : undefined}
                showActions={isOwnProfile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
