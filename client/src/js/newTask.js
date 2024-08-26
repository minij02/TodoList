import { createSchedule } from './api.js';

let selectedDate = null;

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    selectedDate = params.get('date'); // URL 파라미터에서 날짜 가져오기

    console.log('Selected Date:', selectedDate); // 날짜 확인을 위한 로그

    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
        console.error(`Invalid date: ${selectedDate}`);
    }

    // 카테고리와 메모를 저장할 배열
    let categories = [];
    let memos = [];

    // 카테고리 추가 버튼 클릭 이벤트
    document.getElementById('add-category-btn').addEventListener('click', () => {
        const categoryInput = document.getElementById('category-input');
        const categoryValue = categoryInput.value.trim();

        if (categoryValue) {
            categories.push({ name: categoryValue, active: false });
            renderCategories();

            // 입력 필드 초기화
            categoryInput.value = '';
        }
    });

    // 메모 추가 버튼 클릭 이벤트
    document.getElementById('add-memo-btn').addEventListener('click', () => {
        const memoInput = document.getElementById('memo-input');
        const memoValue = memoInput.value.trim();

        if (memoValue) {
            memos.push(memoValue);
            renderMemos();

            // 입력 필드 초기화
            memoInput.value = '';
        }
    });

    // Done 버튼 클릭 이벤트 - MongoDB로 데이터 저장
    document.getElementById('done-btn').addEventListener('click', async () => {
        const date = new Date(selectedDate); // 지정된 날짜를 Date 객체로 변환

        if (isNaN(date)) {
            console.error('Invalid date:', selectedDate);
            return;
        }

        const activeCategory = categories.find(category => category.active); 
        const title = activeCategory ? activeCategory.name : "Untitled";
        const description = memos.length > 0 ? memos[0] : "No Description";
        const data = {
            title,
            description,
            date: date.toISOString(), // ISO 8601 형식으로 변환하여 전송
            isCompleted: false
        };

        try {
            const response = await createSchedule(data);

            if (response && response._id) { 
                alert('Data saved successfully!');
                renderCategories();
                renderMemos();
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    });

    function renderCategories() {
        const categoryList = document.querySelector('.category-list');
        categoryList.innerHTML = '';

        categories.forEach(category => {
            const categoryItem = document.createElement('button');
            categoryItem.classList.add('category-item');
            categoryItem.textContent = category.name;

            categoryItem.addEventListener('click', () => {
                categories.forEach(cat => cat.active = false);
                category.active = true;
                console.log(`Category ${category.name} activated`); // 활성화 로그
                renderCategories();
            });

            if (category.active) {
                categoryItem.classList.add('active');
            }

            categoryList.appendChild(categoryItem);
        });
    }

    function renderMemos() {
        const memoList = document.getElementById('schedule-list');
        memoList.innerHTML = '';

        memos.forEach((memo, index) => {
            const memoItem = document.createElement('div');
            memoItem.classList.add('schedule-item');
            memoItem.textContent = memo;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                memos.splice(index, 1);
                renderMemos();
            });

            const editButton = document.createElement('button');
            editButton.textContent = '수정';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => {
                const newMemo = prompt('수정할 내용을 입력하세요:', memo);
                if (newMemo !== null) {
                    memos[index] = newMemo;
                    renderMemos();
                }
            });

            memoItem.appendChild(editButton);
            memoItem.appendChild(deleteButton);
            memoList.appendChild(memoItem);
        });
    }
});
