// server/seedPost.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/postModel');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    await Post.create({
      title: 'Seed Post',
      content: 'This is a seeded post added directly to MongoDB.',
      category: 'General',
      author: 'Waigiri',
    });

    console.log('✅ Post created');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Error seeding post:', err);
  });
