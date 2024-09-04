import React from "react";
import NoticeItem from './NoticeItem';
import '../../../assets/CSS/Notice.css';

function NoticeList({posts}) {

    return (
        <div className="board-list">
                    <div className="top">
                        <div className="num">번호</div>
                        <div className="title">제목</div>
                        <div className="writer">작성자</div>
                        <div className="date">작성일</div>
                    </div>
                    {posts.map((post) => (
                        <NoticeItem
                            key = {post.num}
                            num = {post.num}
                            title = {post.title}
                            writer = {post.writer}
                            date = {post.date}
                        />
                    ))}
        </div>
    );
}

export default NoticeList