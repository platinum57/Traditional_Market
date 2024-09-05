import React, { useState, useEffect } from 'react'; 
import NoticeItem from './NoticeItem';
import axios from 'axios';
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/NoticeList.css';

function NoticeList() {
    const [notices, setNotices] = useState([]);

    // 서버에서 공지사항 목록을 불러오는 함수
    const fetchNotices = async () => {
        try {
            const response = await axios.get('/notice'); // 공지사항 목록을 가져오는 API 호출
            setNotices(response.data); // 공지사항 목록을 상태로 설정
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

     // 컴포넌트가 마운트될 때 공지사항 목록을 불러옴
    useEffect(() => {
        fetchNotices();
    }, []);

    return (
        <div className="board-list">
                    <div className="top">
                        <div className="num">번호</div>
                        <div className="title">제목</div>
                        <div className="writer">작성자</div>
                        <div className="date">작성일</div>
                    </div>
                    {notices.map((notice) => (
                <NoticeItem 
                    key={notice.notice_num} 
                    notice={notice} 
                />
            ))}
        </div>
    );
}

export default NoticeList