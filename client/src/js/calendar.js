import { fetchSchedules } from './api.js'

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function calculateAchievementRate(schedules) {
    if (schedules.length === 0) return 0;
    const completedCount = schedules.filter(schedule => schedule.isCompleted).length;
    return (completedCount / schedules.length) * 100;
}

function getColorForAchievementRate(rate) {
    if (rate <= 20) return '#FFCCCC'; 
    if (rate <= 40) return '#FF9999'; 
    if (rate <= 60) return '#FF6666'; 
    if (rate <= 80) return '#FF3333'; 
    if (rate <= 100) return '#FF0000'; 
}

export async function renderCalendar() {
    const calendar = document.getElementById("calendar");
    console.log("Render Calendar");
    calendar.innerHTML = generateCalendarHTML(currentYear, currentMonth);

    // 각 날짜별 성취도를 계산하고 색생을 설정
    const dateCells = calendar.querySelectorAll('.date-cell');
    for (let cell of dateCells) {
        const date = cell.dataset.date;

        if (date) {
            const schedules = await fetchSchedules(date);
            if (schedules.length > 0) {
                const achievementRate = calculateAchievementRate(schedules)
                const color = getColorForAchievementRate(achievementRate);
                cell.style.backgroundColor = color;
            } else {
                // 일정이 없을 경우 색상 설정을 하지 않음
                cell.style.backgroundColor = '';  // 기본 색상으로 설정
            }

        }
    }
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

export function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

export function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}
