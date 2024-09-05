import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../../assets/CSS/qna-css/Comments.css';

function Comments({ qna_num }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/qna/comments/${qna_num}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [qna_num]);

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        try {
            const response = await axios.post(`/qna/comments/${qna_num}`, {
                content: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/qna/comments/delete/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentContent(comment.content);
    };

    const handleSaveEditComment = async () => {
        try {
            const response = await axios.put(`/qna/comments/update/${editingCommentId}`, {
                content: editingCommentContent,
            });

            setComments(comments.map(comment => 
                comment.id === editingCommentId ? response.data : comment
            ));
            setEditingCommentId(null);
            setEditingCommentContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div className="comment-section">
            <h3>댓글</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    {editingCommentId === comment.id ? (
                        <>
                            <textarea 
                                value={editingCommentContent}
                                onChange={(e) => setEditingCommentContent(e.target.value)}
                            />
                            <button onClick={handleSaveEditComment}>저장</button>
                            <button onClick={() => setEditingCommentId(null)}>취소</button>
                        </>
                    ) : (
                        <>
                            <p>{comment.content}</p>
                            <button onClick={() => handleEditComment(comment)}>수정</button>
                            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                        </>
                    )}
                </div>
            ))}

            <div className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button onClick={handleAddComment}>댓글 달기</button>
            </div>
        </div>
    );
}

export default Comments;
