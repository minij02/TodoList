import { renderCalendar, showPreviousMonth, showNextMonth } from './calendar.js';
import { fetchSchedules } from './api.js';

document.addEventListener("DOMContentLoaded", function() {
    const calendarElement = document.getElementById("calendar");

    console.log("DOM fully loaded and parsed");
    console.log("calendarElement:", calendarElement);

    if (calendarElement) {
        renderCalendar();  // calendar 요소가 있는 경우에만 renderCalendar 호출
        setupEventListeners();
    } else {
        console.error("calendar 요소를 찾을 수 없습니다.");
    }
});

function setupEventListeners() {
    document.getElementById("prevMonth").addEventListener("click", showPreviousMonth);
    document.getElementById("nextMonth").addEventListener("click", showNextMonth);

    let selectedDate = null;

    // 이벤트 버블링을 활용하여 날짜 클릭 이벤트 리스너 설정
    const calendarElement = document.getElementById("calendar");
    console.log("Setting up event listener on calendar:", calendarElement);

    calendarElement.addEventListener("click", async function(event) {
        console.log("Calendar clicked:", event.target);
        if (event.target.classList.contains("date-cell") && !event.target.classList.contains("empty")) {
            selectedDate = event.target.dataset.date;
            console.log("Selected date in app.js:", selectedDate);

            const schedules = await fetchSchedules(selectedDate);
            displayScheduleForDate(selectedDate, schedules);
        }
    });

    // Create New 버튼 클릭 이벤트 추가
    document.getElementById("create-new-btn").addEventListener("click", () => {
        if (selectedDate) {
            window.location.href = `new-task.html?date=${selectedDate}`; // 선택된 날짜를 URL 파라미터로 전달
        } else {
            console.error("날짜가 선택되지 않았습니다.");
        }
    });
}

export async function displayScheduleForDate(date) {
    const scheduleList = document.getElementById("schedule-list");
    const createNewContainer = document.getElementById("create-new-container");

    const schedules = await fetchSchedules(date);
    console.log("Fetched schedules:", schedules); // 데이터를 로그로 출력

    // 기존 일정 목록 초기화
    scheduleList.innerHTML = '';

    if (schedules.length > 0) {
        createNewContainer.style.display = 'inline-block';
        createNewContainer.style.float = 'right';
        createNewContainer.style.marginTop = '10px';

        schedules.forEach(schedule => {
            const scheduleItem = document.createElement("div");
            scheduleItem.className = "schedule-item";
            scheduleItem.style.display = "flex";
            scheduleItem.style.alignItemms = "center";

             // 일정 완료 여부 체크박스
             const checkbox = document.createElement("input");
             checkbox.type = "checkbox";
             checkbox.checked = schedule.isCompleted;
             checkbox.style.marginRight = "10px";

             checkbox.className = "custom-checkbox";
             checkbox.addEventListener("change", async () => {
                 schedule.isCompleted = checkbox.checked;
                 try {
                     await updateSchedule(schedule); // 완료 여부를 서버에 업데이트
                 } catch (error) {
                     console.error('Error updating schedule:', error);
                 }
             });

             // 제목과 설명을 포함하는 컨테이너 div
            const textContainer = document.createElement("div");
            textContainer.style.display = "flex";
            textContainer.style.flexDirection = "column"; // 텍스트를 수직 정렬
            
            // 일정 제목을 위한 div
            const titleElement = document.createElement("div");
            titleElement.textContent = schedule.title;

            // 일정 설명을 위한 div (작은 글씨)
            const descriptionElement = document.createElement("div");
            descriptionElement.textContent = schedule.description;
            descriptionElement.style.fontSize = "small"; // 작은 글씨로 설정
            descriptionElement.style.color = "gray"; // 회색으로 설정
            descriptionElement.style.marginTop = "5px"; // 제목과 설명 간의 간격 추가

           // textContainer에 titleElement와 descriptionElement를 추가
           textContainer.appendChild(titleElement);
           textContainer.appendChild(descriptionElement);

           // checkbox와 textContainer를 scheduleItem에 추가
           scheduleItem.appendChild(checkbox);
           scheduleItem.appendChild(textContainer);

           scheduleList.appendChild(scheduleItem);
        });
    } else {
        createNewContainer.style.display = 'block';
    }
}