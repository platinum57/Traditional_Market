import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #0073e6;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }

  nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    li {
      margin-left: 20px;
    }
  }
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 10px 0;
    }
  }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex; /* 좌우로 레이아웃을 나누기 위해 flex 사용 */
  flex: 1;
  overflow-y: hidden;
`;

export const MapWrapper = styled.div`
  height: 100%;
  width: 50%; /* 왼쪽 반을 차지하도록 설정 */
  position: relative;
  z-index: 1;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column; /* 상하로 나누기 위해 column 방향 flex 사용 */
  width: 50%; /* 오른쪽 반을 차지하도록 설정 */
`;

export const MarketListContainer = styled.div`
  flex: 9; /* 하단 영역 */
  padding: 20px;
  overflow-y: scroll; /* 세로 스크롤 활성화 */
`;