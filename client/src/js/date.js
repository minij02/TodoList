function displayScheduleForDate(date) {
    // 선택된 날짜의 일정을 표시하는 로직
    const schedules = getSchedulesForDate(date);
    renderSchedules(schedules);
}

function getSchedulesForDate(date) {
    // 주어진 날짜에 해당하는 일정들을 가져오는 함수
    // 여기서는 예시로 간단히 배열을 반환합니다.
    return [
        { title: "Meeting with Bob", isCompleted: false },
        { title: "Dentist appointment", isCompleted: true }
    ];
}

function renderSchedules(schedules) {
    const scheduleList = document.getElementById("schedule-list");
    scheduleList.innerHTML = '';

    schedules.forEach(schedule => {
        const scheduleItem = document.createElement("div");
        scheduleItem.className = "schedule-item";
        scheduleItem.innerHTML = `
            <input type="checkbox" ${schedule.isCompleted ? 'checked' : ''}>
            <span>${schedule.title}</span>
        `;
        scheduleList.appendChild(scheduleItem);
    });
}