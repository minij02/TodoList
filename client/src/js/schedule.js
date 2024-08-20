// 일정 데이터를 로컬 스토리지에 저장하는 함수
function saveSchedule(schedule) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.push({ ...schedule, id: generateId() });
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

// 일정 데이터를 로컬 스토리지에서 업데이트하는 함수
function updateSchedule(updatedSchedule) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules = schedules.map(schedule => schedule.id === updatedSchedule.id ? updatedSchedule : schedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

// 일정 데이터를 로컬 스토리지에서 삭제하는 함수
function removeSchedule(id) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules = schedules.filter(schedule => schedule.id !== id);
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

// ID로 일정 데이터를 로컬 스토리지에서 조회하는 함수
function getScheduleById(id) {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    return schedules.find(schedule => schedule.id === id);
}

// 고유 ID를 생성하는 함수
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// 테스트를 위한 로컬 스토리지 초기화 함수 (선택 사항)
function clearSchedules() {
    localStorage.removeItem('schedules');
}

// 새로운 일정을 추가하는 함수
function addSchedule(date, title) {
    const newSchedule = { date, title, isCompleted: false };
    saveSchedule(newSchedule);
}

// 기존 일정을 수정하는 함수
function editSchedule(id, updatedTitle) {
    const schedule = getScheduleById(id);
    if (schedule) {
        schedule.title = updatedTitle;
        updateSchedule(schedule);
    }
}

// 일정을 삭제하는 함수
function deleteSchedule(id) {
    removeSchedule(id);
}

// 일정의 완료 상태를 토글하는 함수
function toggleCompletion(id) {
    const schedule = getScheduleById(id);
    if (schedule) {
        schedule.isCompleted = !schedule.isCompleted;
        updateSchedule(schedule);
    }
}
