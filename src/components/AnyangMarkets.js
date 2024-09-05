import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegionSelector from './RegionSelector';
import Map from './Map';
import Markets from '../assets/CSS/Markets.css';

const AnyangMarkets = () => {
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  // 시장 데이터를 가져오는 함수
  const fetchMarkets = async () => {
    if (!region && !district) return; // 지역 정보가 없으면 검색하지 않음
    setLoading(true);
    setError(null);
    try {
      const fullRegion = `${region} ${district}`.trim();
      const response = await axios.get('http://localhost:5000/api/markets', {
        params: { region: fullRegion },
      });
      setMarkets(response.data); // markets 상태 업데이트
    } catch (err) {
      setError('시장 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
      setSelectedMarket(null); // 데이터를 불러온 후 선택된 시장을 초기화
    }
  }

  // 지역 변경 핸들러
  const handleRegionChange = (selectedRegion, selectedDistrict) => {
    setRegion(selectedRegion);
    setDistrict(selectedDistrict);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = async () => {
    setMarkets([]); // 시장 목록 초기화
    setLoading(true); // 로딩 상태 활성화
    setSelectedMarket(null); // 선택된 시장 초기화 (상세 페이지 비표시)
    
    // 시장 데이터를 비동기로 가져오기
    await fetchMarkets(); // fetchMarkets가 완료된 후 다음 작업 진행
  
    setLoading(false); // 로딩 상태 비활성화
  };

  // 시장 클릭 핸들러
  const handleMarketClick = (market) => {
    setSelectedMarket(market); // 선택된 시장을 상태로 설정
  };

  useEffect(() => {
    if (selectedMarket) {
      fetchRestaurants(selectedMarket.latitude, selectedMarket.longitude);
    }
  }, [selectedMarket]);

  // 음식점 데이터 가져오는 함수
  const fetchRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants-near-market', {
        params: { latitude, longitude },
      });
      setRestaurants(response.data);
    } catch (err) {
      setError(console.log('음식점 정보를 불러오는 데 실패했습니다.'));
    }
  };

  if (selectedMarket) {
    return (
      <MarketDetail
        market={selectedMarket}
        restaurants={restaurants}
        error={error}
        reSearch={handleSearch} // 재검색 버튼에 handleSearch 연결
      />
    );
  }

  return (
    <div className="anyang-markets-container">
      <h1>지역별 전통시장 정보</h1>
      <RegionSelector
        onRegionChange={handleRegionChange}
        selectedRegion={region}
        selectedDistrict={district}
      />
      <button onClick={handleSearch}>검색</button>
      {loading && <div className="loading">로딩 중...</div>}
      {error && <div className="error">{error}</div>}
      {selectedMarket ? (
        <MarketDetail
          market={selectedMarket}
          goBack={handleGoBack}
          restaurants={restaurants}
          error={error}
        />
      ) : (
        <>
          <ul className="markets-list">
            {markets.map((market, index) => (
              <li key={index} onClick={() => handleMarketClick(market)}>
                {market.시장명}
              </li>
            ))}
          </ul>
          <Map 
            markets={markets}  // 전체 시장 리스트 전달
            selectedMarket={selectedMarket}  // 선택된 시장을 전달하여 강조
            onMarkerClick={handleMarketClick}  // 마커 클릭 시 호출
          />
        </>
      )}
    </div>
  );
};

// 시장 상세 정보 컴포넌트
const MarketDetail = ({ market, restaurants = [], error, reSearch }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marketError, setMarketError] = useState(null);

  useEffect(() => {
    const fetchMarketDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/market-details', {
          params: {
            marketName: market.시장명,
            address: market.소재지도로명주소 || market.소재지지번주소,
            parking: market.주차장보유여부,
          },
        });
        setDetails(response.data);
      } catch (err) {
        setMarketError('해당 시장의 상세 정보를 조회할 수 없습니다. (데이터 미제공)');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketDetails();
  }, [market]);

  if (loading) return <div>로딩 중...</div>;
  if (marketError) {
    return (
      <div>
        <button onClick={reSearch}>재검색</button>
        <p>{marketError}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={reSearch}>뒤로가기</button>
      <h2>{details.name}</h2>
      <p>주소: {details.address}</p>
      <p>주차장 보유 여부: {details.parking ? '예' : '아니오'}</p>
      <p>온누리상품권: {market.acceptsOnnuri ? '사용 가능':'사용 불가'}</p>
      <h3>편의시설 보유 현황</h3>
      <ul>
        <li>고객지원센터: {details.facilities.고객지원센터 ? '보유' : '미보유'}</li>
        <li>유아놀이방: {details.facilities.유아놀이방 ? '보유' : '미보유'}</li>
        <li>고객휴게실: {details.facilities.고객휴게실 ? '보유' : '미보유'}</li>
        <li>수유실: {details.facilities.수유실 ? '보유' : '미보유'}</li>
        <li>물품보관함: {details.facilities.물품보관함 ? '보유' : '미보유'}</li>
        <li>자전거보관함: {details.facilities.자전거보관함 ? '보유' : '미보유'}</li>
      </ul>

      <h3>반경 500m 내 음식점</h3>
      <ul>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <li key={index}>
              <h4>{restaurant.name}</h4>
              <p>거리: {restaurant.distance}m</p>
              <p>전화번호: {restaurant.phone || '없음'}</p>
            </li>
          ))
        ) : (
          <p>음식점 정보를 불러오지 못했습니다. (데이터 미제공)</p>
        )}
      </ul>
    </div>
  );
};

export default AnyangMarkets;
