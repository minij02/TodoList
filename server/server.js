const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // db.js 파일을 불러옵니다.
const scheduleRoutes = require('./routes/scheduleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Express 애플리케이션 인스턴스 생성
const app = express();

// 환경 변수 파일 로드
dotenv.config();

// MongoDB 연결
connectDB(); // MongoDB에 연결합니다.

// CORS 설정
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    credentials: true // 쿠키를 포함한 요청 허용
}));

// JSON 파싱 미들웨어
app.use(express.json());

// 요청이 도달했는지 확인하기 위한 로그 추가 (디버깅용)
app.use('/api/schedules', (req, res, next) => {
    console.log('Received a request at /api/schedules:', req.method, req.body);
    next();
});

// 라우트 설정
console.log('라우트설정');
app.use('/api/schedules', scheduleRoutes);
app.use('/api/categories', categoryRoutes);

// 테스트용 GET 라우트 (브라우저에서 테스트 가능)
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// 테스트용 POST 라우트 (Postman에서 테스트 가능)
app.post('/api/test-post', (req, res) => {
    console.log('test-post');
    console.log('Received a POST request at /api/test-post:', req.body);
    res.send('POST request to /api/test-post was successful!');
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));