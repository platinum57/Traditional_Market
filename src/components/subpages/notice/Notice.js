import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import NoticeList from "./NoticeList";
import Pagination from './Pagination';
import View from './View';
import Write from './Write';
import '../../../assets/CSS/Notice.css';

function Notice() {
    const [posts, setPosts] = useState([
        { num: 5, title: "게시글 제목 5", writer: "아이디?", date: "2024-9-02" },
        { num: 4, title: "게시글 제목 4", writer: "아이디?", date: "2024-9-02" },
        { num: 3, title: "게시글 제목 3", writer: "아이디?", date: "2024-9-02" },
        { num: 2, title: "게시글 제목 2", writer: "아이디?", date: "2024-9-02" },
        { num: 1, title: "게시글 제목 1", writer: "아이디?", date: "2024-9-02" },
        // 게시글 더 추가 가능
    ]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const postsPerPage = 2; // 페이지당 게시글 수

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
                <Route path="/view/:id" element={<View posts={posts} />} />
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
