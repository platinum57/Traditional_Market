const express = require('express');
const router = express.Router();
const { Notice } = require('../models');
const { Users } = require('../models');

//공지사항 게시판 글 작성 API
router.post('/post', async (req, res) => {
    try {
        const { notice_num, notice_title, notice_content, user_id } = req.body;

        const user = await Users.findOne({ where : { user_id } });

        //게시글 작성을 요청하는 유저가 가입되어 있는 유저인지 확인
        if (!user) {
            return res.status(400).json({ message: '로그인 후 작성해주세요.' });
        }

        //공지사항 게시글 작성을 요청하는 유저가 관리자인지 확인
        if (user.auth !== "admin" ){
            return res.status(403).json( { message: '권한이 없는 유저입니다.'});
        }

        //글 작성 요청 API
        const newNotice = await Notice.create({
            notice_num,
            notice_title,
            notice_content,
            user_id,
        });

        //공지사항 작성이 성공적으로 되었음을 알림.
        res.status(201).json({
            message: '글이 성공적으로 등록되었습니다.',
            date: newNotice,
        });
    } catch (error) {
        //서버 오류로 글 작성이 안됨을 알림
        console.error('Error creating error : ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//글 수정을 요청하는 API
router.put('/update/:notice_num', async (req, res) => {
    try {
        const { notice_num } = req.params;
        const { notice_title, notice_content, user_id } = req.body;

        const user = await Users.findOne({ where : { user_id }});
        const noticeNum = await Notice.findOne({ where : { notice_num }});

        //수정을 요청하는 글이 존재하는 게시글인지 확인
        if(!noticeNum) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }
        
        //글 수정을 요청하는 유저가 가입되어 있는 유저인지 확인
        if(!user){
            return res.status(404).json({ message: '로그인 후 작성해주세요. '});
        }

        //글 수정을 요청하는 유저가 관리자인지 확인.
        if(user.auth !== "admin" ){
            return res.status(403).json({ message: '권한이 없는 유저입니다.' });
        }

        //글 수정을 요청하는 API
        await noticeNum.update({
            notice_title,
            notice_content,
            user_id,
        });

        //글이 성공적으로 수정되었음을 알림.
        res.status(200).json({
            message: '글이 성공적으로 수정되었습니다.',
            data: noticeNum,
        });
    } catch (error) {
        //서버 오류로 글 수정이 안되었음을 알림
        console.error('Error updating notice: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//글 삭제를 요청하는 API
router.delete('/delete/:notice_num', async (req, res) => {
    try {
        const { notice_num } = req.params;
        const { user_id } = req.body;

        const user = await Users.findOne({ where : { user_id } });
        const noticeNum = await Notice.findOne({ where : { notice_num }});

        //글 삭제를 시도하는 게시글이 존재하는 게시글인지 확인
        if(!noticeNum) {
            return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
        }
        
        //게시글 삭제를 시도하는 Id가 가입되어 있는 유저인지 확인
        if(!user){
            return res.status(404).json({ message: '로그인 후에 이용해주세요.'});
        }

        //게시글 삭제를 시도하는 id가 관리자 권한이 있는 계정인지 확인
        if(user.auth !== "admin" ){
            return res.status(403).json({ message: '권한이 없는 유저입니다.' });
        }

        //글 삭제 요청 API
        await Notice.destroy({ where : { notice_num }});
        //글이 성공적으로 삭제되었음을 알림
        res.status(200).json({ message : '게시글이 성공적으로 삭제되었습니다. '});

    } catch (error) {
        //서버 오류로 글 삭제가 안되었음을 알림
        console.error('Error deleting notice: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

// 공지사항 목록을 가져오는 API
router.get('/', async (_, res) => {
    try {
        // 데이터베이스에서 모든 공지사항을 불러옴
        const notices = await Notice.findAll();  // 모든 공지사항 데이터 조회
        res.status(200).json(notices);  // 공지사항 데이터를 JSON 형식으로 클라이언트에 반환
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ error: '공지사항을 불러오는 중 오류가 발생했습니다.' });
    }
});

// 특정 공지사항을 불러오는 API
router.get('/:notice_num', async (req, res) => {
    try {
        const { notice_num } = req.params;
        const notice = await Notice.findOne({ where: { notice_num } });

        if (!notice) {
            return res.status(404).json({ message: '해당 공지사항을 찾을 수 없습니다.' });
        }

        res.status(200).json(notice);
    } catch (error) {
        console.error('Error fetching notice:', error);
        res.status(500).json({ error: '공지사항을 불러오는 중 오류가 발생했습니다.' });
    }
});


module.exports = router;