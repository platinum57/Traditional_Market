import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import { AppContainer, ContentContainer, MapWrapper, MarketListContainer, RightContainer } from '../src/assets/CSS/styles';
import SignIn from './components/subpages/SignIn';
import LogIn from './components/subpages/LogIn';
//import MarketList from './components/MarketList';
//import RegionSelector from './components/RegionSelector';
import MarketInfo from './components/MarketInfo';
import Notice from './components/subpages/notice/Notice';
import Write from './components/subpages/notice/Write'; // Write 컴포넌트 임포트
import View from './components/subpages/notice/View'; // View 컴포넌트 임포트
import QnA from './components/subpages/qna/QnA';

function MainContent() {
  return (
    <ContentContainer>
      <MapWrapper>
        <Map />
      </MapWrapper>
      <RightContainer>
        <MarketListContainer>
          <MarketInfo />
        </MarketListContainer>
      </RightContainer>
    </ContentContainer>
  );
}
function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          {/* 명확하게 기본 경로로 설정 */}
          <Route path="/" element={<MainContent />} />
          {/* 다른 경로 설정 */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Notice/*" element={<Notice />} /> {/* Notice 페이지 연결 */}
          <Route path="/QnA/*" element={<QnA />} /> {/* Notice 페이지 연결 */}
          <Route path="/Write" element={<Write />} /> {/* Write 페이지 연결 */}
          <Route path="/view/:id" element={<View />} /> {/* View 페이지 연결 */}
          <Route path="/notice/edit/:id" element={<Write />} />  {/* 기존 게시글 수정 */}
          {/* 모든 미지정 경로를 기본 경로로 리디렉션 */}
          <Route path="*" element={<MainContent />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}
export default App;