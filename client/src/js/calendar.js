let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = generateCalendarHTML(currentYear, currentMonth);
}

function generateCalendarHTML(year, month) {
    const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 번째 날의 요일 (0: 일요일, 6: 토요일)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수

    let html = '';

    // 월과 연도를 표시하는 헤더
    html += `<div class="month-header">${year}년 ${month + 1}월</div>`;
   // 요일 표시
   html += '<div class="week-days">';
   const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
   weekDays.forEach(day => {
       html += `<div>${day}</div>`;
   });
   html += '</div>';

   // 날짜를 표시할 컨테이너
    html += '<div class="dates">';

    // 첫 번째 주의 빈 칸을 채우기 위한 반복문
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="date-cell empty"></div>`;
    }

    // 각 날짜를 렌더링하는 반복문
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div class="date-cell" data-date="${year}-${month + 1}-${day}">${day}</div>`;
    }

    // 남은 칸을 빈 칸으로 채우기 (마지막 주를 채우기 위해 필요)
    const remainingCells = (firstDay + daysInMonth) % 7;
    if (remainingCells !== 0) {
        for (let i = 0; i < 7 - remainingCells; i++) {
            html += `<div class="date-cell empty"></div>`;
        }
    }

    html += '</div>';
    return html;
}

function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}
