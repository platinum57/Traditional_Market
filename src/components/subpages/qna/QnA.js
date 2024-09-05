import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import QnAList from './QnAList';
import QnAPagination from './QnAPagination';
import QnAView from './QnAView';
import QnAWrite from './QnAWrite';
// import '../../../assets/CSS/QnA.css';
import '../../../assets/CSS/notice-css/global.css';

function QnA() {
    const [questions, setQuestions] = useState([
        { num: 5, title: "질문 제목 5", writer: "아이디?", date: "2024-9-02" },
        { num: 4, title: "질문 제목 4", writer: "아이디?", date: "2024-9-02" },
        { num: 3, title: "질문 제목 3", writer: "아이디?", date: "2024-9-02" },
        { num: 2, title: "질문 제목 2", writer: "아이디?", date: "2024-9-02" },
        { num: 1, title: "질문 제목 1", writer: "아이디?", date: "2024-9-02" },
        // 질문 더 추가 가능
    ]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const questionsPerPage = 2; // 페이지당 질문 수

    // 현재 페이지의 질문 계산
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // 페이지 변경 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const location = useLocation();

    return (
        <div className="board-wrap">
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="board-title">
                            <h1>Q&A 게시판</h1>
                        </div>
                        <div className="board-list-wrap">
                            <QnAList questions={currentQuestions} /> {/* 현재 페이지의 질문 */}
                            <QnAPagination
                                questionsPerPage={questionsPerPage}
                                totalQuestions={questions.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </div>
                    </>
                } />
                <Route path="/view/:id" element={<QnAView questions={questions} />} />
                <Route path="/write" element={<QnAWrite addQuestion={(newQuestion) => setQuestions([newQuestion, ...questions])} />} />
            </Routes>
            {location.pathname === "/QnA" && (
                <div className="btn-wrap">
                    <Link to="/write" className="btn-list">질문하기</Link>
                </div>
            )}
        </div>
    );
}

export default QnA;
