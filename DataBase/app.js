// app.js
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models'); // Sequelize 인스턴스 가져오기
const usersRouter = require('./routes/userService'); // Users 신규가입 라우터 가져오기
const qnaRouter = require('./routes/qnaService'); //Post 작성하는 라우터 가져오기
const replyRouter = require('./routes/replyService'); //reply 작성하는 라우터
const noticeRouter = require('./routes/noticeService'); //Notice 작성하는 라우터

const app = express();

app.use(morgan('dev')); // 로그
app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 본문 파싱

app.use('/user', usersRouter); //회원가입 라우터 연결
app.use('/qna', qnaRouter); //신규 QnA 글쓰기 라우터 연결
app.use('/reply', replyRouter); //신규 댓글쓰기 라우터 연결
app.use('/notice', noticeRouter); //신규 공지쓰기 라우터 연결

// 데이터베이스 연결 및 서버 시작
sequelize.sync({ force: false }) // force: false -> 기존 테이블 유지
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });