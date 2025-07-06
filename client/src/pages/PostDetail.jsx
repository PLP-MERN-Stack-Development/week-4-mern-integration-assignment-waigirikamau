// src/pages/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError('Post not found or an error occurred.');
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded shadow">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4 text-gray-500">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Posts
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        Category: {post.category} | Author: {post.author}
      </div>
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetail;
