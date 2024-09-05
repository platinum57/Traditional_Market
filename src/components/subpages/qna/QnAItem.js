import React from "react";
import { Link } from 'react-router-dom';
import '../../../assets/CSS/notice-css/global.css';

function QnAItem({ question }) {
    return (
        <div>
            <div className="num">{question.qna_num}</div>
            <div className="title">
                <Link to={`/qna/view/${question.qna_num}`}>
                    {question.qna_title}
                </Link>
            </div>
            <div className="writer">{question.user_id}</div>
            <div className="date">{new Date(question.createdAt).toLocaleDateString()}</div>
        </div>
    );
}

export default QnAItem;
