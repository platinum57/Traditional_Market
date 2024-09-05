import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';

function View() {
    const { notice_num } = useParams(); // URL 파라미터로 받은 notice_num
    const [post, setPost] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // 서버에서 해당 ID의 게시글을 가져옴
                const response = await axios.get(`http://localhost:3010/notice/${notice_num}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching notice:', error);
            }
        };

        fetchPost();
    }, [notice_num]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleEdit = () => {
        // 수정 페이지로 이동, 글의 ID를 함께 전달
        navigate(`/notice/edit/${notice_num}`);
    };

    // 공지사항 삭제 함수
    const handleDelete = async () => {
        try {
            // 삭제 요청을 서버에 보냄
            const response = await axios.delete(`/notice/delete/${notice_num}`, {
                data: { user_id: 'admin' }  // 관리자 권한을 가진 사용자
            });

            if (response.status === 200) {
                // 삭제 후 공지사항 목록 페이지로 이동
                navigate('/Notice');
            } else {
                alert('공지사항 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting notice:', error);
            alert('서버 오류로 인해 공지사항을 삭제할 수 없습니다.');
        }
    };

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h2>{post.notice_title}</h2>
            </div>
            <div className="board-content">
                <p>{post.notice_content}</p>
            </div>
            <div className="board-footer">
                <span>작성자: {post.user_id}</span>
                <span>작성일: {post.createdAt}</span>
            </div>
            <div className="btn-wrap">
                <Link to="/Notice" className="btn-list">목록</Link>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default View;




