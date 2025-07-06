// server/models/postModel.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  featuredImage: String, // ← ensure this exists
  tags: [String],
  isPublished: Boolean,
  viewCount: { type: Number, default: 0 },
  comments: [{ body: String, date: Date }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
