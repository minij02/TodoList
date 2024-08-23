// 일정 모델
// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false }
});

// mongoose.model()은 Mongoose에서 새로운 모델 생성
// 첫 번째 인수는 모델의 이름, 두 번째 인수는 스키마(모델 구조 정의)
// 생성된 모델을 `Schedule` 변수에 할당
const Schedule = mongoose.model('Schedule', scheduleSchema); 

module.exports = Schedule;
