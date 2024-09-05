import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';  // 댓글 컴포넌트 import
import '../../../assets/CSS/notice-css/global.css';

function QnAView() {
    const { qna_num } = useParams(); 
    const [question, setQuestion] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`/qna/view/${qna_num}`);
                setQuestion(response.data);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [qna_num]);

    if (!question) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/qna/delete/${qna_num}`);
            if (response.status === 200) {
                navigate('/qna');
            } else {
                alert('질문 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('서버 오류로 인해 질문을 삭제할 수 없습니다.');
        }
    };

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h2>{question.qna_title}</h2>
            </div>
            <div className="board-content">
                <p>{question.qna_content}</p>
            </div>
            <div className="board-footer">
                <span>작성자: {question.user_id}</span>
                <span>작성일: {question.createdAt}</span>
            </div>

            {/* 댓글 컴포넌트를 별도로 불러옴 */}
            <Comments qna_num={qna_num} />

            <div className="btn-wrap">
                <Link to="/qna" className="btn-list">목록</Link>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default QnAView;
