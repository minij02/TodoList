// 일정 모델
// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
