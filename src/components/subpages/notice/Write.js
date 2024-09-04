import React from "react";
import { Link, useNavigate } from "react-router-dom";

import '../../../assets/CSS/Notice.css';

function Write({ addPost }) {

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h2>공지사항</h2>
            </div>
            <div className="input-title">
                <dl>
                    <dt>
                        제목
                    </dt>
                    <dd>
                        <input type="text" placeholder="제목 입력"></input>
                    </dd>
                </dl>
            </div>
            <div className="board-content">
                <textarea placeholder="내용 입력"></textarea>
            </div>
        <div className="btn-wrap">
            <Link to="#" className="btn-list">등록</Link>
        </div>
        </div>
    )
}

export default Write;




