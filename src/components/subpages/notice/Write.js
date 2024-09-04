import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'; // API 호출을 위한 axios
// import '../../../assets/CSS/Notice.css';
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/Write.css';

function Write() {
    const { notice_num } = useParams();  // URL에서 notice_num 파라미터를 가져옴 (수정 시 사용)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate

    // 수정 모드일 경우 기존 데이터를 불러옴
    useEffect(() => {
        if (notice_num) {  // notice_num이 있을 경우 수정 모드로 인식
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/notice/view/${notice_num}`);  // 공지사항 데이터 가져오기
                    const post = response.data;
                    setTitle(post.notice_title);  // 제목 설정
                    setContent(post.notice_content);  // 내용 설정
                } catch (error) {
                    console.error('Error fetching notice:', error);
                }
            };

            fetchPost();  // 데이터 가져오기
        }
    }, [notice_num]);

    // 폼 제출 시 실행되는 함수 (작성/수정 처리)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (notice_num) {
                // 수정 모드: PUT 요청으로 데이터 수정
                const response = await axios.put(`/notice/update/${notice_num}`, {
                    notice_title: title,
                    notice_content: content,
                    user_id: 'admin'  // 로그인된 사용자 정보 사용
                });

                if (response.status === 200) {
                    // 수정 완료 후 해당 글의 상세 페이지로 이동
                    navigate(`/notice/view/${notice_num}`);
                } else {
                    alert('공지사항 수정에 실패했습니다.');
                }
            } else {
                // 작성 모드: POST 요청으로 새로운 공지사항 작성
                const response = await axios.post('/notice/post', {
                    notice_title: title,
                    notice_content: content,
                    user_id: 'admin'  // 로그인된 사용자 정보 사용
                });

                if (response.status === 201) {
                    // 작성 완료 후 목록 페이지로 이동
                    navigate('/Notice');
                } else {
                    alert('공지사항 등록에 실패했습니다.');
                }
            }
        } catch (error) {
            console.error('Error posting or updating notice:', error);
            alert('서버 오류로 인해 작업을 처리할 수 없습니다.');
        }
    };

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h2>{notice_num ? '공지사항 수정' : '공지사항 작성'}</h2>  {/* 수정/작성 모드에 따른 제목 */}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-title">
                    <dl>
                        <dt>제목</dt>
                        <dd>
                            <input 
                                type="text" 
                                placeholder="제목 입력" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </dd>
                    </dl>
                </div>
                <div className="board-content">
                    <textarea 
                        placeholder="내용 입력"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="btn-wrap">
                    <button type="submit" className="btn-list">
                        {notice_num ? '수정 완료' : '등록'}  {/* 수정/작성 모드에 따른 버튼 */}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Write;
