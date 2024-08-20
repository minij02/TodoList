//카테고리 관련 API 라우트
const Category = require('../models/Category');

// 카테고리 추가
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: '카테고리 추가 실패', error });
    }
};

// 카테고리 조회
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: '카테고리 조회 실패', error });
    }
};

// 카테고리 삭제
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: '카테고리 삭제 완료' });
    } catch (error) {
        res.status(500).json({ message: '카테고리 삭제 실패', error });
    }
};
