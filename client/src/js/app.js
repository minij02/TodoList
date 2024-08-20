document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    initializeApp();
});

function initializeApp() {
    // 달력 표시 초기화
    showCalendar();

    // 이벤트 리스너 설정
    setupEventListeners();
}

function showCalendar() {
    // 달력 표시를 위한 로직
    renderCalendar(); // calendar.js에서 가져온 함수
}

function setupEventListeners() {
    // 이전/다음 달 이동 이벤트 리스너 설정
    document.getElementById("prevMonth").addEventListener("click", showPreviousMonth);
    document.getElementById("nextMonth").addEventListener("click", showNextMonth);

    // Create New 버튼 클릭 이벤트 추가
    document.getElementById("create-new-btn").addEventListener("click", () => {
        window.location.href = "new-task.html"; // 페이지를 이동하는 코드
    });
    
    // 이벤트 버블링을 활용하여 날짜 클릭 이벤트 리스너 설정
    document.getElementById("calendar").addEventListener("click", function(event) {
        if (event.target.classList.contains("date-cell") && !event.target.classList.contains("empty")) {
            onDateClick(event);
        }
    });
}

function onDateClick(event) {
    const date = event.target.dataset.date;
    if (date) {
        displayScheduleForDate(date);
    }
}

function displayScheduleForDate(date) {
    const scheduleList = document.getElementById("schedule-list");
    const createNewContainer = document.getElementById("create-new-container");
    // 샘플 데이터로 일정을 표시하는 예시
    const schedules = getSchedulesForDate(date);
    
    // 기존 일정 목록 초기화
    scheduleList.innerHTML = '';

    if (schedules.length > 0) {
        // 일정이 있는 경우, Create New 버튼 숨기기
        createNewContainer.style.display = 'none';

        schedules.forEach(schedule => {
            const scheduleItem = document.createElement("div");
            scheduleItem.className = "schedule-item";
            scheduleItem.textContent = schedule;
            scheduleList.appendChild(scheduleItem);
        });
    } else {
        // 일정이 없는 경우, Create New 버튼 표시
        createNewContainer.style.display = 'block';
    }
}

function getSchedulesForDate(date) {
    // 특정 날짜에 대한 일정을 반환하는 함수 (여기서는 샘플 데이터 사용)
    const sampleSchedules = {
        "2024-08-01": ["회의", "점심 약속"],
        "2024-08-02": ["프로젝트 마감", "운동"],
        "2024-08-03": ["여행 준비"],
    };
    return sampleSchedules[date] || [];
}
