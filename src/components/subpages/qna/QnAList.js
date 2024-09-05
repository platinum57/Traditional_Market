import React, { useState, useEffect } from 'react'; 
import QnAItem from './QnAItem';
import axios from 'axios';
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/NoticeList.css';

function QnAList() {
    const [questions, setQuestions] = useState([]);

    // 서버에서 QnA 목록을 불러오는 함수
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/qna'); // QnA 목록을 가져오는 API 호출
            setQuestions(response.data); // QnA 목록을 상태로 설정
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="board-list">
            <div className="top">
                <div className="num">번호</div>
                <div className="title">질문</div>
                <div className="writer">작성자</div>
                <div className="date">작성일</div>
            </div>
            {questions.map((question) => (
                <QnAItem 
                    key={question.qna_num} 
                    question={question} 
                />
            ))}
        </div>
    );
}

export default QnAList;
