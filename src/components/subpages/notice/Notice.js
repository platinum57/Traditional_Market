import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NoticeList from "./NoticeList";
import Pagination from './Pagination';
import View from './View';
import Write from './Write';
import '../../../assets/CSS/Notice.css';

function Notice() {
    const [posts, setPosts] = useState([
        { num: 5, title: "게시글 제목", writer: "아이디?", date: "2024-9-02" },
        { num: 4, title: "게시글 제목", writer: "아이디?", date: "2024-9-02" },
        { num: 3, title: "게시글 제목", writer: "아이디?", date: "2024-9-02" },
        { num: 2, title: "게시글 제목", writer: "아이디?", date: "2024-9-02" },
        { num: 1, title: "게시글 제목", writer: "아이디?", date: "2024-9-02" },
    ]);

    return (
        <div className="board-wrap">
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="board-title">
                            <h1>공지사항</h1>
                        </div>
                        <div className="board-list-wrap">
                            <NoticeList posts={posts} />
                            <Pagination />
                        </div>
                    </>
                } />
                <Route path="/view/:id" element={<View posts={posts} />} />
            </Routes>
            <div className="btn-wrap">
                <Link to="/Write" className="btn-list">글쓰기</Link>
            </div>
        </div>
    );
}

export default Notice;
