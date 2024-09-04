import React from 'react';
import '../../assets/CSS/LogIn.css';

function LogIn() {
  return (
    <div style={{ width: '25%', height: '350px', margin: '0 auto', padding: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>로그인</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" name="id" placeholder="아이디를 적어주세요" />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="비밀번호를 적어주세요" />
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LogIn;
