import React, { useState } from 'react';
import '../../assets/CSS/SignIn.css';
import RegionSelector from '../RegionSelector';

function SignIn() {
  const handleRegionSelect = (region) => {
    console.log('Selected Region:', region);
  };

  const handleDistrictSelect = (district) => {
    console.log('Selected District:', district);
  };

  return (
    <div style={{ width: '25%', height: '450px', margin: '0 auto', padding: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>회원 가입</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" placeholder="이름을 적어주세요" />
        </div>

        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" name="id" placeholder="아이디를 적어주세요" />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="비밀번호를 적어주세요" />
        </div>

        <div className="form-group">
          <label>관심 지역</label>
          <RegionSelector 
            onRegionChange={handleRegionSelect} 
            onDistrictChange={handleDistrictSelect}
          />
        </div>

        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default SignIn;
