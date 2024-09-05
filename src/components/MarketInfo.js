import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegionSelector from './RegionSelector';
import Map from './Map';
import Sorry from '../assets/img/sorry.png';
import Markets from '../assets/CSS/Markets.css';
import {
  loungeTrue,  loungeFalse,  lockerTrue,  lockerFalse,  bycicleFalse,  bycicleTrue,  helpdestFalse,  helpdestTrue,  mommyFalse,  mommyTrue,  parkingFalse,  parkingTrue,  playFalse,  playTrue,  voucherFalse,  voucherTrue
} from '../assets/img/icons/icons'

const localhosturl = 'http://localhost:5050'

const MarketInfo = () => {
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
      const response = await axios.get(`${localhosturl}/api/markets`, {
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

    await fetchMarkets(); // fetchMarkets가 완료된 후 다음 작업 진행
    setLoading(false); // 로딩 상태 비활성화
  };

  // 시장 클릭 핸들러
  const handleMarketClick = async (market) => {
    // 1. 기존 상세 정보를 리셋
    setRestaurants([]); // 음식점 정보 초기화
    setSelectedMarket(null); // 선택된 시장을 초기화
    setError(null); // 에러 상태 초기화
    setLoading(true); // 로딩 상태로 설정
  
    // 2. 클릭한 시장의 좌표를 이용해 updateMap 이벤트 발생
    const coords = { latitude: market.latitude, longitude: market.longitude };
    document.getElementById('map').dispatchEvent(new CustomEvent('updateMap', { detail: coords }));
  
    // 3. 클릭한 시장의 상세 정보를 불러옴 (setSelectedMarket을 통해 불러옴)
    setSelectedMarket(market);
};

const clearRestaurants = () => {
  setRestaurants([]); // 음식점 정보를 빈 배열로 초기화
};

  useEffect(() => {
    if (selectedMarket) {
      const coords = { latitude: selectedMarket.latitude, longitude: selectedMarket.longitude };
      // 좌표값을 사용하여 지도 이동
      document.getElementById('map').dispatchEvent(new CustomEvent('updateMap', { detail: coords }));
      fetchRestaurants(selectedMarket.latitude, selectedMarket.longitude);
    }
  }, [selectedMarket]);

  // 음식점 데이터 가져오는 함수
  const fetchRestaurants = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${localhosturl}/api/restaurants-near-market`, {
        params: { latitude, longitude },
      });
      setRestaurants(response.data);
    } catch (err) {
      setError(console.log('음식점 정보를 불러오는 데 실패했습니다.'));
    }finally {
      setLoading(false); // 로딩 상태 해제
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
            selectedMarket={selectedMarket}  // 클릭한 마커를 강조하기 위한 선택된 시장 전달
            onMarkerClick={setSelectedMarket}  // 마커 클릭 시 호출
            clearRestaurants={clearRestaurants} // 음식점 정보 초기화 함수 전달
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
  const [apiError, setApiError] = useState(null); // 서버 에러 상태 추가

  useEffect(() => {
    const fetchMarketDetails = async () => {
      setLoading(true);
      setApiError(null); // API 에러 초기화

      try {
        const response = await axios.get(`${localhosturl}/api/market-details`, {
          params: {
            marketName: market.시장명,
            address: market.소재지도로명주소 || market.소재지지번주소,
            parking: market.주차장보유여부,
          },
        });
        if (response.data) {
          // 상세 정보를 성공적으로 불러왔을 경우
          setDetails(response.data);
        } else {
          // 불러오는 데 실패한 경우 에러 메시지 표시
          setDetails({
            error: '해당 시장의 상세 정보를 조회할 수 없습니다. (데이터 미제공)',
          });
        }
      } catch (error) {
        // 서버 에러일 경우 에러 메시지 설정
        setApiError('해당 시장의 상세 정보를 조회할 수 없습니다. (데이터 미제공)');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchMarketDetails();
  }, [market]);

  if (loading) return <div>로딩 중...</div>;

  if (apiError) {
    return (
      <div>
        <button onClick={reSearch}>뒤로가기</button>
        <p>{apiError}</p>
      </div>
    );
  }

  if (details && details.error) {
    return (
      <div>
        <button onClick={reSearch}>뒤로가기</button>
        <p>{details.error}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={reSearch}>뒤로가기</button>
      <h2>{details.name}</h2>
      <p>주소: {details.address}</p>
      <p><img src={details.parking ? parkingTrue : parkingFalse} className="img-detail-big" />
      <img src={market.acceptsOnnuri ? voucherTrue:voucherFalse} className="img-detail-big"/></p>
      <p className='text-spacing'>{details.parking ? '주차장 있어요' : '주차장 없어요'}<span className='texp-gap'></span>
      {market.acceptsOnnuri ? '온누리상품권 써져요' : '온누리상품권 안써져요'}
      </p>
      <h3>기타 편의 시설</h3>
      <div className='detail'>
        <img src={details.facilities.고객지원센터 ? helpdestTrue : helpdestFalse} className="img-detail"/>
        <img src={details.facilities.유아놀이방 ? playTrue : playFalse} className="img-detail"/>
        <img src={details.facilities.고객휴게실 ? loungeTrue : loungeFalse} className="img-detail"/>
        <img src={details.facilities.수유실 ? mommyTrue : mommyFalse} className="img-detail"/>
        <img src={details.facilities.물품보관함 ? lockerTrue : lockerFalse} className="img-detail"/>
        <img src={details.facilities.자전거보관함 ? bycicleTrue : bycicleFalse} className="img-detail"/>
      </div>

      <h3>반경 500m 내 음식점</h3>
<ul>
  {error || restaurants.length === 0 ? (
    <p>{error || '표시할 음식점이 없습니다. (데이터 미제공)'}</p>
  ) : (
    restaurants.map((restaurant, index) => (
      <li key={index}>
        <h4>{restaurant.name}</h4>
        <div><img src={restaurant.thumbnail ? restaurant.thumbnail : Sorry}/></div>
        <p>거리: {restaurant.distance}m</p>
        <p>전화번호: {restaurant.phone || '없음'}</p>
      </li>
    ))
  )}
</ul>
    </div>
  );
};
export default MarketInfo;
