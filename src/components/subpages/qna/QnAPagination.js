import React from "react";
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/Pagination.css';

const QnAPagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const goToFirstPage = () => paginate(1);
    const goToPreviousPage = () => paginate(currentPage > 1 ? currentPage - 1 : 1);
    const goToNextPage = () => paginate(currentPage < totalPages ? currentPage + 1 : totalPages);
    const goToLastPage = () => paginate(totalPages);

    return (
        <nav className="board-page">
            <button onClick={goToFirstPage} className="btn">&lt;&lt;</button>
            <button onClick={goToPreviousPage} className="btn">&lt;</button>
            {pageNumbers.map(number => (
                <span key={number} className={`num ${currentPage === number ? 'on' : ''}`}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </span>
            ))}
            <button onClick={goToNextPage} className="btn">&gt;</button>
            <button onClick={goToLastPage} className="btn">&gt;&gt;</button>
        </nav>
    );
};

export default QnAPagination;
