const express = require('express');
const { body } = require('express-validator');
const {
  getAllPosts,
  getPostByIdOrSlug,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/postController');

const router = express.Router();

// GET all posts
router.get('/', getAllPosts);

// GET single post by ID or slug
router.get('/:idOrSlug', getPostByIdOrSlug);

// Search posts
router.get('/search', searchPosts);

// POST create a new post
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  createPost
);

// PUT update post
router.put(
  '/:id',
  [
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
  ],
  updatePost
);

// DELETE post
router.delete('/:id', deletePost);

// POST comment to post
router.post('/:id/comments', addComment);

module.exports = router;
