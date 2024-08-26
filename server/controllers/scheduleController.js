//일정 관련 API 라우트
const Schedule = require('../models/Schedule');

// 일정 추가
exports.addSchedule = async (req, res) => {
    console.log("addSchedule");
    const { title, description, date } = req.body;

    try {
        const newSchedule = new Schedule({ title, description, date });
        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(500).json({ message: '일정 추가 실패', error });
    }
};

// 일정 조회
exports.getSchedules = async (req, res) => {
    try {
        console.log("getSchedules");
        const { date } = req.query;
        
       let schedules;
       if (date) {
        schedules = await Schedule.find({date: new Date(date)});
       } else {
        schedules = await Schedule.find();
       }
       res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: '일정 조회 실패', error });
    }
};

// 일정 수정
exports.updateSchedule = async (req, res) => {
    console.log("updateSchedule");
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            { title, description, isCompleted },
            { new: true }
        );
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: '일정 수정 실패', error });
    }
};

// 일정 삭제
exports.deleteSchedule = async (req, res) => {
    console.log("deleteSchedule");
    const { id } = req.params;

    try {
        await Schedule.findByIdAndDelete(id);
        res.status(200).json({ message: '일정 삭제 완료' });
    } catch (error) {
        res.status(500).json({ message: '일정 삭제 실패', error });
    }
};
