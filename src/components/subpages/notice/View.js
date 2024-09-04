import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../../../assets/CSS/Notice.css';

function View({ posts = [] }) {
    const { id } = useParams();  // URL에서 id를 추출
    const post = posts.find(p => p.num === parseInt(id));

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h3>{post ? post.title : "제목 없음"}</h3>  {/* post가 없으면 "제목 없음" */}
                <div className="info">
                    {/* <dl>
                        <dt>번호</dt>
                        <dd>{post ? post.num : "번호 없음"}</dd>
                    </dl> */}
                    <dl>
                        <dt>작성자</dt>
                        <dd>{post ? post.writer : "작성자 없음"}</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>{post ? post.date : "작성일 없음"}</dd>
                    </dl>
                </div>
            </div>
            <div className="board-content">
                <p>내용: {post ? "여기에 게시글 내용을 추가하세요." : "내용이 없습니다."}</p>  {/* post가 없으면 "내용이 없습니다." */}
            </div>
            <div className="btn-wrap">
                <Link to="/Notice" className="btn-list">목록</Link>
                <Link to="#" className="btn-edit">수정</Link>
                <Link to="#" className="btn-edit">삭제</Link>
            </div>
        </div>
    )
}

export default View;




