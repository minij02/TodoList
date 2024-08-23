import { createSchedule } from './api.js';
// 카테고리와 메모를 저장할 배열
let categories = [
    { name: '운동', active: false },
    { name: '과제', active: false },
    { name: '공부', active: false }
];
let memos = [];

// 카테고리 추가 버튼 클릭 이벤트
document.getElementById('add-category-btn').addEventListener('click', () => {
    const categoryInput = document.getElementById('category-input');
    const categoryValue = categoryInput.value.trim();

    if (categoryValue) {
        categories.push({name: categoryValue, active: false});
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

// 카테고리를 UI에 렌더링하는 함수
function renderCategories() {
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = ''; // 기존 카테고리 초기화

    categories.forEach(category => {
        const categoryItem = document.createElement('button');
        categoryItem.classList.add('category-item');
        categoryItem.textContent = category.name;

        // 카테고리 클릭 시 활성화 상태를 변경하는 이벤트 리스너 추가
        categoryItem.addEventListener('click', () => {
            categories.forEach(cat => cat.active = false); // 모든 카테고리 비활성화
            category.active = true; // 클릭한 카테고리 활성화
            renderCategories(); // UI 업데이트
        });

        if (category.active) {
            categoryItem.classList.add('active');
        }

        categoryList.appendChild(categoryItem);
    });
}

// 메모를 UI에 렌더링하는 함수
function renderMemos() {
    const memoList = document.getElementById('schedule-list');
    memoList.innerHTML = ''; // 기존 메모 초기화

    memos.forEach((memo, index) => {
        const memoItem = document.createElement('div');
        memoItem.classList.add('schedule-item');
        memoItem.textContent = memo;

        // 메모 삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            memos.splice(index, 1); // 해당 메모 삭제
            renderMemos(); // UI 업데이트
        });

        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const newMemo = prompt('수정할 내용을 입력하세요:', memo);
            if (newMemo !== null) {
                memos[index] = newMemo; // 메모 수정
                renderMemos(); // UI 업데이트
            }
        });

        memoItem.appendChild(editButton);
        memoItem.appendChild(deleteButton);
        memoList.appendChild(memoItem);
    });
}

// Done 버튼 클릭 이벤트 - MongoDB로 데이터 저장
document.getElementById('done-btn').addEventListener('click', async () => {

    const date = new Date().toISOString().split('T')[0]; // 현재 날짜
   
    const title = categories.length > 0 ? categories[0].name : "Untitled"; // 첫 번째 카테고리 이름
    const description = memos.length > 0 ? memos[0] : "No Description"; // 첫 번째 메모
    const data = {
        title,
        description,
        date,
        isCompleted: false
    };

    try {
        const response = await createSchedule(data);

        if (response && response._id) { // ID가 존재하는지 확인; response.ok가 true로 평가되지 않으면 Failed to save data 오류가 발생
            alert('Data saved successfully!');
            categories = [];
            memos = [];
            renderCategories();
            renderMemos();
        } else {
            throw new Error('Failed to save data');
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
});