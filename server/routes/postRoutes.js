const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/postModel');
const router = express.Router();

// Set up Multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images are saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create a new post with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const featuredImage = req.file ? req.file.filename : 'default-post.jpg';

    const post = new Post({ title, content, category, author, featuredImage });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Serve uploaded images
router.use('/uploads', express.static('uploads'));
