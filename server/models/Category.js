//카테고리 모델
// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
