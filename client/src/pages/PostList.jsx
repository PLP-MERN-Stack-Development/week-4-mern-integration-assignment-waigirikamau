// src/pages/PostList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data || []); // ✅ Already fixed
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-md shadow-sm flex gap-4 bg-white">
              {post.featuredImage && (
                <img
                  src={`http://localhost:5001/uploads/${post.featuredImage}`}
                  alt={post.title}
                  className="w-32 h-24 object-cover rounded"
                />
              )}
              <div>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">By {post.author || 'Anonymous'}</p>
                <p className="text-gray-700 mt-2">
                  {post.content.length > 150
                    ? `${post.content.slice(0, 150)}...`
                    : post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
