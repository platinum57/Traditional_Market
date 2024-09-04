const express = require('express');
const router = express.Router();
const { Qna_board } = require('../models');
const { Users } = require('../models');

//QnA 게시판 글 작성 API
router.post('/post', async (req, res) => {
    try {
        const { qna_title, qna_content, user_id } = req.body;

        const user = await Users.findOne({ where: { user_id } });

        //게시글 작성을 요청하는 유저가 가입되어 있는 유저인지 확인
        if (!user) {
            return res.status(400).json({ message: '로그인 후 작성해주세요' });
        }

        //글 작성 요청 API
        const newPost = await Qna_board.create({
            qna_title,
            qna_content,
            user_id,
        });

        //Qna 글이 성공적으로 작성되었음을 알림.
        res.status(201).json({
            message: '글이 성공적으로 등록되었습니다.',
            date: newPost,
        });
    } catch (error) {
        //서버 오류로 글 작성이 안됨을 알림
        console.error('Error creating error: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//글 수정을 요청하는 API
router.put('/update/:qna_num', async (req, res) => {
    try {
        const { qna_num } = req.params;
        const { qna_title, qna_content, user_id } = req.body;

        const user = await Users.findOne({ where: { user_id } });
        const qnaNum = await Qna_board.findOne({ where: { qna_num } });

        //수정을 요청하는 글이 존재하는 게시글인지 확인
        if (!qnaNum) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }

        //글 삭제를 요청하는 유저가 가입되어 있는 유저인지 확인
        if (!user) {
            return res.status(400).json({ message: '로그인 후 작성해주세요.' });
        }

        //글 업데이트를 요청하는 유저가 해당 글을 쓴 당사자인지 확인
        if (user_id !== qnaNum.user_id) {
            return res.status(401).json({ message: '글 수정 권한이 없습니다.' });
        }

        //글 수정 요청하는 API
        await qnaNum.update({
            qna_title,
            qna_content,
            user_id,
        });

        //글이 성공적으로 수정되었음을 알림
        res.status(200).json({ message: '글이 성공적으로 수정되었습니다.' });
    } catch (error) {
        //서버 오류로 글 수정이 안되었음을 알림.
        console.error('Error updating Qna: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//글 삭제를 요청하는 API
router.delete('/delete/:qna_num', async (req, res) => {
    try {
        const { qna_num } = req.params;
        const { user_id } = req.body;

        const user = await Users.findOne( { where: { user_id } });
        const qnaNum = await Qna_board.findOne({ where : { qna_num } });

        //삭제를 요청하는 글이 존재하는 게시글인지 확인
        if(!qnaNum) {
            return res.status(404).json({ message : '존재하지 않는 게시글입니다.' });
        }

        //글 삭제를 시도하는 Id가 가입되어 있는 유저인지 확인
        if(!user) {
            return res.status(400).json({ message: '로그인 후에 이용해주세요.' });
        }

        //게시글 삭제를 시도하는 id가 글 작성자거나 관리자 권한이 있는 계정인지 확인
        if( user.auth === "admin" || user_id === qnaNum.user_id ){
            await qnaNum.destroy();
            //글이 성공적으로 삭제되었음을 알림
            return res.status(200).json({ message : '글이 성공적으로 삭제되었습니다.' });
        }
        return res.status(401).json({ message : '글 삭제 권한이 없습니다. '});

    } catch (error) {
        //서버 오류로 글 삭제가 안되었음을 알림.
        console.error('Error deleting qna: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

module.exports = router;