import React from "react";
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // 페이지 이동 함수들
    const goToFirstPage = () => paginate(1);                // 첫 페이지로 이동
    const goToPreviousPage = () => paginate(currentPage > 1 ? currentPage - 1 : 1); // 이전 페이지로 이동
    const goToNextPage = () => paginate(currentPage < totalPages ? currentPage + 1 : totalPages); // 다음 페이지로 이동
    const goToLastPage = () => paginate(totalPages);         // 마지막 페이지로 이동

    return (
        <nav className="board-page">
            {/* << 첫 페이지로 이동 */}
            <button onClick={goToFirstPage} className="btn">&lt;&lt;</button>
            
            {/* < 이전 페이지로 이동 */}
            <button onClick={goToPreviousPage} className="btn">&lt;</button>
            
            {/* 페이지 번호들 */}
            {pageNumbers.map(number => (
                <span key={number} className={`num ${currentPage === number ? 'on' : ''}`}>
                    <button
                        onClick={() => paginate(number)}  // 페이지 변경
                        className="page-link"
                    >
                        {number}
                    </button>
                </span>
            ))}
            
            {/* > 다음 페이지로 이동 */}
            <button onClick={goToNextPage} className="btn">&gt;</button>
            
            {/* >> 마지막 페이지로 이동 */}
            <button onClick={goToLastPage} className="btn">&gt;&gt;</button>
        </nav>
    );
};

export default Pagination;
