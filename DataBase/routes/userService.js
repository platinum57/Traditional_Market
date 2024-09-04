const express = require('express');
const router = express.Router();
const { Users } = require('../models');

//회원가입 API
router.post('/signIn', async (req, res) => {
    try {
        const { user_id, user_name, password, city } = req.body;
        const idRegex = /^[a-zA-Z0-9]{5,10}$/; //5-10자리 영문자 숫자 섞인 아이디
        const passRegex = /^[a-zA-Z0-9]{6,12}$/; //6-12자리 영문자 숫자 섞인 비밀번호
        const nameRegex = /^[a-zA-Z가-힣]{2,}$/; //이름에 한글과 영문자만 가능하게

        const existingUser = await Users.findOne( { where : { user_id }});
        
        //아이디 유효성 검사
        if(!idRegex.test(user_id)) {
            return res.status(400).json({ message : '아이디는 5~10자 길이의 영문자, 숫자만 가능합니다' });
        }
        
        //비밀번호 유효성 검사
        if(!passRegex.test(password)) {
            return res.status(400).json({ message : '비밀번호는 6~12자 길이의 영문자 숫자만 가능합니다.' });
        }
        
        //이름 유효성 검사
        if(!nameRegex.test(user_name)) {
            return res.status(400).json({ message : '이름은 두글자 이상의 한글과 영문자만 가능합니다.'});
        }
        
        //이미 가입되어 있는 아이디인지 확인
        if (existingUser) {
            return res.status(409).json({ message : '이미 존재하는 id입니다 다른 id를 입력해주세요'});
        }

        //신규 회원가입 API
        const newUser = await Users.create({
            user_id,
            user_name,
            password,
            city
        });

        //회원가입이 성공적으로 되었음을 알림.
        res.status(201).json({
            message: '회원가입이 성공적으로 완료되었습니다.',
            date: newUser,
        });
    } catch (error) {
        //서버 오류로 회원가입이 안됨을 알림
        console.error('Error creating user: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//유저 정보 수정하는 API
router.put('/update/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const { user_name, password, city } = req.body;

        const user = await Users.findOne({ where : { user_id } });
        
        //유저 정보 수정을 요청하는 id가 존재하는 id인지 확인
        if(!user) {
            return res.status(404).json( { message: '존재하지 않는 유저입니다.' });
        }

        //유저 정보 업데이트 API
        await user.update({
            user_name,
            password,
            city,
        });

        //회원 정보 수정이 성공적으로 되었음을 알림.
        res.status(200).json({
            message: '회원정보가 성공적으로 수정되었습니다.',
            data: user,
        });

    } catch (error) {
        //서버 오류로 회원 정보 수정이 안되었음을 알림.
        console.error('Error updating user: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

//회원 탈퇴 API
router.delete('/signOut/:user_id', async (req, res) => {
    try {
        const { user_id } = req.body;

        const user = await Users.findOne({ where : { user_id } });

        //회원탈퇴를 요청하는 id가 가입되어 있는 유저인지 확인
        if ( !user ) {
            return res.status(404).json({ message : '존재하지 않는 유저입니다' });
        }

        //회원 탈퇴 요청 API
        await Users.destroy({ where : { user_id }});

        //회원 탈퇴가 성공적으로 되었음을 알림
        res.status(200).json({ message: '회원탈퇴가 성공적으로 되었습니다.' });
    } catch (error) {
        //서버 오류로 글 삭제가 안되었음을 알림
        console.error('Error deleting user: ', error);
        res.status(500).json({ error: '서버에 에러가 발생하였습니다. 잠시 후에 다시 시도해 주세요.' });
    }
});

module.exports = router;