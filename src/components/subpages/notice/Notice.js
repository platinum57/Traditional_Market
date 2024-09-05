import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import NoticeList from "./NoticeList";
import Pagination from './Pagination';
import View from './View';
import Write from './Write';
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';
import axios from "axios";

function Notice() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const postsPerPage = 5; // 페이지당 게시글 수

    // 현재 페이지의 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const location = useLocation();

    return (
        <div className="board-wrap">
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="board-title">
                            <h1>공지사항</h1>
                        </div>
                        <div className="board-list-wrap">
                            <NoticeList posts={currentPosts} /> {/* 현재 페이지의 게시글 */}
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </div>
                    </>
                } />
                <Route path="/view/:notice_num" element={<View />} />
                <Route path="/Write" element={<Write addPost={(newPost) => setPosts([newPost, ...posts])} />} />
            </Routes>
            {location.pathname === "/Notice" && (
                <div className="btn-wrap">
                    <Link to="/Write" className="btn-list">글쓰기</Link>
                </div>
            )}
        </div>
    );
}

export default Notice;
