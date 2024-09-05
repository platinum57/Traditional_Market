const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5001;

// CORS 설정
app.use(cors());

// API 키 설정
const DATA_GO_KR_SERVICE_KEY = 'V28pENnD1KiAhyUvZhFFO9y3h%2FCYnVRDZxBXHXPwBFIcyMhW0VaEr6uZ1J1fRWNJr88cktC3tXCh%2Fvif%2FRV2sQ%3D%3D'; // https://www.data.go.kr에서 발급받은 키
const KAKAO_API_KEY = '275e44cf1fd3b5b851f999dd586904b5'; // 카카오 API 키

// 시장 목록 API 엔드포인트
app.get('/api/markets', async (req, res) => {
    const region = req.query.region;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 2000;

    const URL = `https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=${page}&perPage=${perPage}&serviceKey=${DATA_GO_KR_SERVICE_KEY}`;    //api 호출 URL

    try {
        const response = await axios.get(URL);
        const markets = response.data.data;     //응답 데이터 저장할 변수 선언

        const filteredMarkets = markets
            .filter(market => {
                const address = market.소재지도로명주소 || market.소재지지번주소;
                return address.includes(region);    //입력받은 지역의 이름이 주소에 포함되는 경우만 필터링
            })
            .sort((a, b) => b.점포수 - a.점포수)    //점포 수 많은 순으로 정렬
            .slice(0, 15);  //시장의 수가 15개가 넘어갈 경우, 상위 15개만 호출

        const marketWithCoordinates = await Promise.all(
            filteredMarkets.map(async (market) => {
                const address = market.소재지도로명주소 || market.소재지지번주소;
                const coords = await getCoordinatesFromAddress(address);

                const acceptsOnnuri = market.사용가능상품권.includes("온누리상품권");
                return {
                    ...market,
                    latitude: coords.lat,
                    longitude: coords.lng,
                    acceptsOnnuri
                };
            })
        );

        res.json(marketWithCoordinates);
    } catch (error) {
        console.error('시장 데이터를 가져오는 중 오류 발생:', error.message);
        res.status(500).json({ error: '시장 데이터를 가져오는 데 실패했습니다.', message: error.message });
    }
});

// 시장 상세 정보 API 엔드포인트
app.get('/api/market-details', async (req, res) => {
    const marketName = req.query.marketName;
    const address = req.query.address;  //앞서 호출한 api에서 얻은 데이터 저장

    const URL = `https://api.odcloud.kr/api/15090621/v1/uddi:b3a7658a-a6db-4b9a-b612-f3c85741dffe?page=1&perPage=2000&serviceKey=${DATA_GO_KR_SERVICE_KEY}`;

    try {
        const response = await axios.get(URL);  // 상세정보 api 호출
        const facilitiesData = response.data.data;  //호출한 데이터 저장할 변수

        // 사용자가 선택한 시장 이름과 같은 데이터를 필터링
        const selectedMarketFacilities = facilitiesData.find(facility => facility["시장-상점가명"] === marketName);

        if (!selectedMarketFacilities) {
            throw new Error('해당 시장의 편의시설 정보를 찾을 수 없습니다.');
        }

        // 선택된 시장의 편의시설 정보를 구성
        const facilities = {
            고객지원센터: selectedMarketFacilities["보유여부 - 고객지원센터"] === 1,
            유아놀이방: selectedMarketFacilities["보유여부 - 유아놀이방(어린이 놀이터)"] === 1,
            고객휴게실: selectedMarketFacilities["보유여부 - 고객휴게실"] === 1,
            수유실: selectedMarketFacilities["보유여부 - 수유실"] === 1,
            물품보관함: selectedMarketFacilities["보유여부 - 물품보관함"] === 1,
            자전거보관함: selectedMarketFacilities["보유여부 - 자전거보관함"] === 1
        };  //편의시설이 있으면 1, 없으면 0

        // 시장의 기본 정보와 함께 편의시설 정보를 합쳐서 응답
        res.json({
            name: marketName,
            address,
            parking: req.query.parking,
            facilities,
        });
    } catch (error) {
        console.error('상세 정보를 가져오는 중 오류 발생:', error.message);
        res.status(500).json({ error: '상세 정보를 가져오는 데 실패했습니다.', message: error.message });
    }
});

// 주소를 좌표로 변환하는 함수
async function getCoordinatesFromAddress(address) {
    try {
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        });

        if (response.data.documents.length > 0) {
            const { y: lat, x: lng } = response.data.documents[0];
            return { lat, lng };
        } else {
            throw new Error('좌표를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('주소 변환 중 오류 발생:', error.message);
        return { lat: null, lng: null };
    }
}

// 음식점 정보 API 엔드포인트
app.get('/api/restaurants-near-market', async (req, res) => {
    const { latitude, longitude } = req.query;
    const radius = 500; // 검색 반경 (500m)
    const numOfRows = 10; // 한번에 불러올 음식점의 수 (최대 10개)
    const arrange = 'S'; // 거리순 정렬
    const contentTypeId = 39; // 음식점 콘텐츠 ID

    const URL = `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${DATA_GO_KR_SERVICE_KEY}&numOfRows=${numOfRows}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=${arrange}&contentTypeId=${contentTypeId}&mapX=${longitude}&mapY=${latitude}&radius=${radius}&_type=json`;

    try {
        const response = await axios.get(URL);
        const items = response.data.response.body.items.item;

        const restaurants = items.map(item => ({
            name: item.title,
            distance: parseFloat(item.dist).toFixed(1),
            phone: item.tel,
            thumbnail: item.firstimage
        }));

        res.json(restaurants);
    } catch (error) {
        console.error('음식점 정보를 가져오는 중 오류 발생:', error.message);
        res.status(500).json({ error: '음식점 정보를 가져오는 데 실패했습니다.', message: error.message });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});