import React, { useEffect, useRef } from 'react';

const Map = ({ markets, selectedMarket, onMarkerClick }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]); // 기존 마커를 저장하는 배열

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9c013cffc99959e1dd65a1c3145a57ef&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5598681, 126.9673822),
          level: 5,
        };
        mapRef.current = new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };

    return () => script.remove();
  }, []);

  // 기존 마커들을 제거하는 함수
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null)); // 기존 마커를 지도에서 제거
    markersRef.current = []; // 마커 배열 초기화
  };

  // 새로운 마커를 찍는 함수
  const addMarkers = () => {
    if (mapRef.current && markets.length > 0) {
      clearMarkers(); // 기존 마커 제거

      markets.forEach((market) => {
        if (market.latitude != null && market.longitude != null) {
          const markerPosition = new window.kakao.maps.LatLng(market.latitude, market.longitude);

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: getDefaultMarkerImage() // 기본 마커 이미지 사용
          });

          marker.setMap(mapRef.current);
          markersRef.current.push(marker); // 새로운 마커를 배열에 추가

          // InfoWindow를 생성하여 마커에 마우스를 올리면 보여줄 정보 설정
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:10px;word-break:break-all;overflow-wrap:break-word;width:180px;max-width:550px;">${market.시장명}<br>${market.소재지도로명주소 || market.소재지지번주소}</div>`
          });
          
          // 마커에 마우스 올릴 때 InfoWindow 표시
          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(mapRef.current, marker);
          });

          // 마커에서 마우스가 떠나면 InfoWindow 닫기
          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });

          // 마커 클릭 이벤트를 추가하여 시장 선택 상태 변경
          window.kakao.maps.event.addListener(marker, 'click', () => {
            mapRef.current.setCenter(markerPosition);
            mapRef.current.setLevel(3);

            // 선택된 마커를 빨간색으로 변경
            markersRef.current.forEach(m => m.setImage(getDefaultMarkerImage())); // 모든 마커 기본색으로
            marker.setImage(getRedMarkerImage()); // 클릭된 마커는 붉은색으로 변경

            // 클릭한 마커(시장) 정보를 상위 컴포넌트로 전달
            if (onMarkerClick) {
              onMarkerClick(market);
            }
          });
          // 선택된 마커 강조
          if (selectedMarket && selectedMarket.latitude === market.latitude && selectedMarket.longitude === market.longitude) {
            marker.setImage(getRedMarkerImage());  // 선택된 마커 강조
            mapRef.current.setCenter(markerPosition);  // 지도 중심 이동
            mapRef.current.setLevel(3);  // 지도 확대
        }
      }
      });

      // 첫 번째 좌표가 있는 시장으로 지도의 중심을 이동
      const firstMarketWithCoordinates = markets.find(market => market.latitude != null && market.longitude != null);
      if (firstMarketWithCoordinates) {
        mapRef.current.setCenter(new window.kakao.maps.LatLng(firstMarketWithCoordinates.latitude, firstMarketWithCoordinates.longitude));
        mapRef.current.setLevel(5); // 적절한 줌 레벨 설정
      }

      // 선택된 시장이 있으면 해당 시장으로 중심 이동 및 줌 레벨 조정
      if (selectedMarket && selectedMarket.latitude != null && selectedMarket.longitude != null) {
        const selectedMarketMarker = markersRef.current.find(marker =>
          marker.getPosition().getLat() === selectedMarket.latitude &&
          marker.getPosition().getLng() === selectedMarket.longitude
        );

        // 선택된 시장이 있으면 해당 시장으로 중심 이동 및 줌 레벨 조정
if (selectedMarket && selectedMarket.latitude != null && selectedMarket.longitude != null) {
  console.log('Moving map to selected market:', selectedMarket);
  const selectedMarketPosition = new window.kakao.maps.LatLng(selectedMarket.latitude, selectedMarket.longitude);
  mapRef.current.setCenter(selectedMarketPosition); // 선택된 마커 중심으로 이동
  mapRef.current.setLevel(3); // 지도 줌 레벨 설정
}

      }
    }
  };

  // 기본 마커 이미지 가져오기
  const getDefaultMarkerImage = () => {
    const markerImageUrl = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 기본 마커 이미지 URL
    const markerImageSize = new window.kakao.maps.Size(24, 35); // 마커 이미지 크기
    return new window.kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  };

  // 붉은 마커 이미지 가져오기
  const getRedMarkerImage = () => {
    const markerImageUrl = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
    const markerImageSize = new window.kakao.maps.Size(50, 60);
    return new window.kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  };

  useEffect(() => {
    addMarkers();
  }, [markets, selectedMarket]);

  return <div id="map" style={{ width: '100%', height: '75vh' }} />;
};

export default Map;
