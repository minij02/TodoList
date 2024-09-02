import { renderCalendar, showPreviousMonth, showNextMonth } from './calendar.js';
import { fetchSchedules, deleteSchedule, updateSchedule } from './api.js';

document.addEventListener("DOMContentLoaded", function() {
    const calendarElement = document.getElementById("calendar");
    const scheduleList = document.getElementById("schedule-list");
    const createNewContainer = document.getElementById("create-new-container");

    // 페이지 로드 시 scheduleList와 createNewContainer를 숨김
    scheduleList.style.display = 'none';
    createNewContainer.style.display = 'none';
    
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
        scheduleList.style.display = 'block';
        createNewContainer.style.display = 'inline-block';
        createNewContainer.style.float = 'right';
        createNewContainer.style.marginTop = '10px';
       
        schedules.forEach(schedule => {
            const scheduleItem = document.createElement("div");
            scheduleItem.className = "schedule-item";
            scheduleItem.style.display = "flex";
            scheduleItem.style.alignItemms = "center";
            scheduleItem.style.justifyContent  = "space-between"; // 좌우 간격을 띄워 배치

             // 일정 완료 여부 체크박스
             const checkbox = document.createElement("input");
             checkbox.type = "checkbox";
             checkbox.checked = schedule.isCompleted;
             checkbox.className = "custom-checkbox";
             checkbox.style.marginRight = "10px";

             checkbox.addEventListener("change", async () => {
                //schedule에 _id가 있는지 확인
                if (!schedule._id) {
                    console.log("Schedue ID is missing:", schedule);
                    return;
                }
                 schedule.isCompleted = checkbox.checked;
                 try {
                     await updateSchedule(schedule); // 완료 여부를 서버에 업데이트
                     console.log("Schedule updated!");
                 } catch (error) {
                     console.error('Error updating schedule:', error);
                 }
             });

             // 제목과 설명을 포함하는 컨테이너 div
            const textContainer = document.createElement("div");
            textContainer.style.flexGrow = "1"; // title과 description을 가운데 정렬
            textContainer.style.textAlign = "center"; // 텍스트 가운데 정렬
            // textContainer.style.display = "flex";
            // textContainer.style.flexDirection = "column"; // 텍스트를 수직 정렬

            // 일정을 위한 div
            const descriptionElement = document.createElement("div");
            descriptionElement.textContent = schedule.description;

            // 카테고리를 위한 div (작은 글씨)
            const titleElement = document.createElement("div");
            titleElement.textContent = schedule.title;
            titleElement.style.fontSize = "small"; // 작은 글씨로 설정
            titleElement.style.color = "gray"; // 회색으로 설정
            titleElement.style.marginTop = "5px"; // 제목과 설명 간의 간격 추가

           // textContainer에 titleElement와 descriptionElement를 추가
           textContainer.appendChild(descriptionElement);
           textContainer.appendChild(titleElement);

<<<<<<< Updated upstream
=======
           // 수정 버튼 추가
           const editButton = document.createElement("button");
           editButton.innerHTML = '✏️'; // 연필 이모지 사용
           editButton.style.marginRight = "10px"; // 삭제 버튼 왼쪽에 배치
           editButton.addEventListener("click",  () => {
            titleElement.style.display = "none";
            descriptionElement.style.display = "none";
            titleInput.style.display = "block";
            descriptionInput.style.distplay = "block";
            descriptionInput.focus(); // 수정 버튼 클릭 시 descriptionInput에 포커스
           })
        
           // Enter 키를 눌렀을 때 수정 내용을 저장하는 이벤트 리스너 추가
           const handleKeyPress = async (event) => {
            if (event.key  === "Enter") {
                schedule.title = titleInput.value;
                schedule.description = descriptionInput.value;
                titleElement.textContent = schedule.title;
                descriptionElement.textContent = schedule.description;
                titleElement.style.display = "block";
                descriptionElement.style.display = "block";
                titleInput.style.display = "none";
                descriptionInput.style.display = "none";
                try {
                    await updateSchedule(schedule); // 수정된 데이터를 서버에 업데이트
                    console.log("Schedule  updated!");
                    displayScheduleForDate(date); // 수정 후 일정 다시 불러오기
                } catch (error)  {
                    console.error('Error updating schedule: ', error);
                }
            }
           }

           titleInput.addEventListener("keyup", handleKeyPress);
           descriptionInput.addEventListener("keyup", handleKeyPress);

>>>>>>> Stashed changes
            // 삭제 버튼 추가
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '🗑️'; // 쓰레기통 이모지 사용
            deleteButton.addEventListener("click", async () => {
                console.log('Delete button clicked for schedule:', schedule._id);
                try {
                    await deleteSchedule(schedule._id); // 서버에서 일정 삭제
                    displayScheduleForDate(date); // 삭제 후 일정 다시 불러오기
                } catch (error) {
                    console.error('Error deleting schedule:', error);
                }
            });

           // checkbox와 textContainer를 scheduleItem에 추가
           scheduleItem.appendChild(checkbox);
           scheduleItem.appendChild(textContainer);
           scheduleItem.appendChild(deleteButton);
           
           scheduleList.appendChild(scheduleItem);
        });
    } else {
        scheduleList.style.display = 'none';
        createNewContainer.style.display = 'block';
    }
}