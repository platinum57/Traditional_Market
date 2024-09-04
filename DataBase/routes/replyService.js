const express = require('express');
const router = express.Router();
const { Reply } = require('../models');
const { Users } = require('../models');

//댓글 작성 API
router.post('/post/:qna_num', async (req, res) => {
    try {
        const { qna_num } = req.params;
        const { reply_num, reply_content, user_id } = req.body;
        
        //신규 댓글 작성 API
        const newReply = await Reply.create({
            reply_num,
            reply_content,
            user_id,
            qna_num,
        });

        //댓글 작성이 성공적으로 되었음을 알림
        res.status(201).json({
            message: '댓글이 성공적으로 작성되었습니다.',
            date: newReply,
        });
    } catch (error) {
        console.error('Error creating error: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//댓글 수정을 요청하는 API
router.put('/update/:reply_num', async (req, res) => {
    try{
        const { reply_num } = req.params;
        const { reply_content, user_id } = req.body;

        const user = await Users.findOne({ where : { user_id } });
        const replyNum = await Reply.findOne({ where : { reply_num } });

        //수정을 요청하는 댓글이 존재하는 댓글인지 확인
        if (!replyNum) {
            return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
        }

        //댓글 수정을 요청하는 유저가 가입되어 있는 유저인지 확인
        if(!user) {
            return res.status(400).json({ message : '로그인 후 작성해주세요.' });
        }

        //댓글 수정을 요청하는 유저가 해당 댓글을 작성한 유저인지 확인
        if(user_id !== replyNum.user_id) {
            return res.status(401).json({ message : '댓글 수정 권한이 없습니다.' });
        }

        //댓글 수정을 요청하는 API
        await replyNum.update({
            reply_content,
            user_id,
        });

        //글이 성공적으로 수정되었음을 알림
        res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다.' });
    } catch (error) {
        //서버 오류로 댓글 수정이 안되었음을 알림
        console.error('Error updating Reply: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//댓글 삭제 API
router.delete('/delete/:reply_num', async (req, res) => {
    try {
        const { reply_num } = req.params;
        const { user_id } = req.body;

        const user = await Users.findOne( { where : { user_id } });
        const replyNum = await Reply.findOne({ where : { reply_num } });

        //삭제를 요청하는 댓글이 존재하는 댓글인지 확인
        if(!replyNum) {
            return res.status(404).json({ message : '존재하지 않는 게시글입니다.' });
        }

        //댓글 삭제를 시도하는 id가 가입되어 있는 유저인지 확인
        if(!user) {
            return res.status(400).json({ message : '로그인 후에 이용해주세요.' });
        }

        //댓글 삭제를 요청하는 id와 해당 댓글을 작성한 id가 같은지 확인
        if(user_id !== replyNum.user_id){
            return res.status(401).json({ message : '댓글 삭제 권한이 없습니다.' });
        }

        //댓글 삭제 요청 API
        await replyNum.destroy();
        //댓글이 성공적으로 삭제되었음을 알림.
        return res.status(200).json({ message : '댓글이 성공적으로 삭제되었습니다. '});
        
    } catch (error) {
        //서버 오류로 댓글 삭제가 안되었음을 알림
        console.error('Error deleting reply: ', error);
        res.status(500).json({ error : '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

module.exports = router;