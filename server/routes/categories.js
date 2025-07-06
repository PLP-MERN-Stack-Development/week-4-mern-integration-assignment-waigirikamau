const express = require('express');
const { body } = require('express-validator');
const {
  getAllCategories,
  createCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// GET all categories
router.get('/', getAllCategories);

// POST create new category
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required'),
  ],
  createCategory
);

module.exports = router;
