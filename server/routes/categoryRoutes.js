const express = require('express');
const router = express.Router();
const {
    addCategory,
    getCategories,
    deleteCategory
} = require('../controllers/categoryController');

// 카테고리 추가
router.post('/', addCategory);

// 카테고리 조회
router.get('/', getCategories);

// 카테고리 삭제
router.delete('/:id', deleteCategory);

module.exports = router;
