// 서버와의 통신을 위한 API 함수 호출
// 서버로부터 일정을 가져오는 함수

// `date`라는 인수를 받아서 이 날짜와 관련된 일정을 가져옴
export async function fetchSchedules(date) {
    // 서버의 `api\schedules` 엔드포인트에 `GET` 요청을 보냄
    // 이후 `fetch` 가 반환하는 프로미스를 기다림. 서버의 응답을 받을 때까지 코드 실행 일시 중지
    const response = await fetch(`/api/schedules?date=${date}`);
    //응답을 JSON 형태로 파싱하여 반환
    return response.json();
}

// 새 일정을 생성하는 함수
export async function createSchedule(schedule) {
    try {
        const response = await fetch('http://localhost:5000/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });

        if (!response.ok) {
            console.error('Server response:', await response.text());
            throw new Error('Failed to create schedule');
        }

        const data = await response.json();
        console.log('Schedule created:', data);
        return data;
    } catch (error) {
        console.error('Error in createSchedule:', error);
        throw error;
    }
}

// 일정을 업데이트하는 함수
export async function updateSchedule(schedule) {
    const response = await fetch(`/api/schedules/${schedule.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    });

    if (!response.ok) {
        throw new Error('Failed to update schedule');
    }

    return response.json();
}

// 일정을 삭제하는 함수
export async function deleteSchedule(id) {
    const response = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete schedule');
    }

    return response.json();
}