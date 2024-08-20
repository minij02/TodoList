console.log("scheduleRouter.js");

const express = require('express');
const router = express.Router();
const {
    addSchedule,
    getSchedules,
    updateSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');

console.log("layer");
router.stack.forEach(layer => {
    
    console.log("layer.route : " , layer.route);
    if (layer.route) { // 라우트 핸들러인지 확인
        const path = layer.route.path;
        const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
        console.log(`Method(s): ${methods}, Path: ${path}`);
    }
});
// 일정 추가
router.post('/', addSchedule);

// 일정 조회
router.get('/', getSchedules);

// 일정 수정
router.put('/:id', updateSchedule);

// 일정 삭제
router.delete('/:id', deleteSchedule);

module.exports = router;