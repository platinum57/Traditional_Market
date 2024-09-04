import React from "react";
import { Link } from 'react-router-dom';
import '../../../assets/CSS/Notice.css';

function NoticeItem({ num, title, writer, date }) {
    return (
        <div>
            <div className="num">{num}</div>
            <div className="title">
                <Link to={`/Notice/view/${num}`} className="title2">{title}</Link>
            </div>
            <div className="writer">{writer}</div>
            <div className="date">{date}</div>
        </div>
    );
}

export default NoticeItem;
