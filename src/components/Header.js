import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/header.css';  // 헤더의 스타일을 위한 CSS 파일
import logo from '../assets/img/logo.png';

const Header = () => {

  return (
    <header className="header">
      <img class="logo" src={logo} alt=""/>
      <h1 class="Name">전통길</h1>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/MainContent">대문</Link></li>
          <li><Link to="/Notice">공지사항</Link></li>
          <li><Link to="/QnA">질문</Link></li>
          <li><Link to="/Signin">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
