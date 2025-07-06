const Post = require('../models/Post');
const { validationResult } = require('express-validator');

// GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author category')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:idOrSlug
exports.getPostByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const post = await Post.findOne({
      $or: [{ _id: idOrSlug }, { slug: idOrSlug }],
    }).populate('author category');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

// POST /api/posts/:id/comments
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const { user, content } = req.body;
    await post.addComment(user, content);

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/search?q=...
exports.searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;

    const posts = await Post.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') },
      ],
    }).populate('author category');

    res.json(posts);
  } catch (err) {
    next(err);
  }
};
