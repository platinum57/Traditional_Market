import React from "react";
import { Link } from 'react-router-dom';
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';


function NoticeItem({ notice }) {
    return (
        <div>
            <div className="num">{notice.notice_num}</div>  {/* 공지사항 번호 */}
            <div className="title">
                <Link to={`/notice/view/${notice.notice_num}`}>
                    {notice.notice_title}
                </Link>
            </div>  {/* 제목 */}
            <div className="writer">{notice.user_id}</div>  {/* 작성자 */}
            <div className="date">{new Date(notice.createdAt).toLocaleDateString()}</div>  {/* 작성일 */}
        </div>
    );
}

export default NoticeItem;
