import React from "react";
import {Link} from 'react-router-dom';
import '../../../assets/CSS/Notice.css';

function Pagination() {

    return (
        <div className="board-page">
            <Link to="#" className="btn first">&lt;&lt;</Link>
            <Link to="#" className="btn prev">&lt;</Link>
            <Link to="#" className="num on">1</Link>
            <Link to="#" className="num">2</Link>
            <Link to="#" className="num">3</Link>
            <Link to="#" className="num">4</Link>
            <Link to="#" className="num">5</Link>
            <Link to="#" className="btn next">&gt;</Link>
            <Link to="#" className="btn last">&gt;&gt;</Link>
        </div>
    )
}

export default Pagination;