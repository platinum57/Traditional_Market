import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    // 총 페이지 수 계산
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="board-page">
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
        </nav>
    );
};

export default Pagination;
