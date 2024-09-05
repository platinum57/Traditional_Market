import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../assets/CSS/notice-css/global.css';
import '../../../assets/CSS/notice-css/Write.css';

function QnAWrite() {
    const { qna_num } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (qna_num) {
            const fetchQuestion = async () => {
                try {
                    const response = await axios.get(`/qna/view/${qna_num}`);
                    const question = response.data;
                    setTitle(question.qna_title);
                    setContent(question.qna_content);
                } catch (error) {
                    console.error('Error fetching question:', error);
                }
            };
            fetchQuestion();
        }
    }, [qna_num]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (qna_num) {
                const response = await axios.put(`/qna/update/${qna_num}`, {
                    qna_title: title,
                    qna_content: content,
                });
                if (response.status === 200) {
                    navigate(`/qna/view/${qna_num}`);
                } else {
                    alert('질문 수정에 실패했습니다.');
                }
            } else {
                const response = await axios.post('/qna/post', {
                    qna_title: title,
                    qna_content: content,
                });
                if (response.status === 201) {
                    navigate('/qna');
                } else {
                    alert('질문 등록에 실패했습니다.');
                }
            }
        } catch (error) {
            console.error('Error posting or updating question:', error);
            alert('서버 오류로 인해 작업을 처리할 수 없습니다.');
        }
    };

    return (
        <div className="board-wrap">
            <div className="board-title">
                <h2>{qna_num ? '질문 수정' : '질문 작성'}</h2>
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
                        {qna_num ? '수정 완료' : '등록'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default QnAWrite;
