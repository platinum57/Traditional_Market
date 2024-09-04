import React, { useState } from 'react';
import '../assets/CSS/RegionSelector.css'; // 스타일링을 위한 CSS 파일

// 팝업(모달) 컴포넌트
function RegionModal({ isOpen, onClose, regions, onRegionSelect, onDistrictSelect, selectedRegion, selectedDistrict }) {
  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>지역 선택</h3>
        <div className="region-section">
          <h4>광역시/도 선택</h4>
          <div className="region-buttons">
            {Object.keys(regions).map((region) => (
              <button
                key={region}
                className={selectedRegion === region ? 'selected' : ''}
                onClick={() => onRegionSelect(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {selectedRegion && (
          <div className="district-section">
            <h4>시/군/구 선택</h4>
            <div className="district-buttons">
              {regions[selectedRegion].map((district) => (
                <button
                  key={district}
                  className={selectedDistrict === district ? 'selected' : ''}
                  onClick={() => onDistrictSelect(district)}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}

// 메인 컴포넌트
function RegionSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const regions = {
    "서울특별시": [
      "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", 
      "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", 
      "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", 
      "종로구", "중구", "중랑구"
    ],
    "부산광역시": [
      "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", 
      "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
    ],
    "대구광역시": [
      "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
    ],
    "인천광역시": [
      "강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", 
      "옹진군", "중구"
    ],
    "광주광역시": [
      "광산구", "남구", "동구", "북구", "서구"
    ],
    "대전광역시": [
      "대덕구", "동구", "서구", "유성구", "중구"
    ],
    "울산광역시": [
      "남구", "동구", "북구", "울주군", "중구"
    ],
    "세종특별자치시": [
      "세종시 전체"
    ],
    "경기도": [
      "수원시", "고양시", "용인시", "성남시", "부천시", "안산시", "화성시", "남양주시", 
      "평택시", "의정부시", "파주시", "시흥시", "김포시", "광주시", "군포시", "이천시", 
      "오산시", "하남시", "안성시", "포천시", "의왕시", "양평군", "여주시", "동두천시", 
      "과천시", "가평군", "연천군"
    ],
    "강원도": [
      "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", 
      "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", 
      "고성군", "양양군"
    ],
    "충청북도": [
      "청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", 
      "괴산군", "음성군", "단양군"
    ],
    "충청남도": [
      "천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", 
      "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"
    ],
    "전라북도": [
      "전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", 
      "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"
    ],
    "전라남도": [
      "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", 
      "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", 
      "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"
    ],
    "경상북도": [
      "포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", 
      "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", 
      "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"
    ],
    "경상남도": [
      "창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", 
      "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", 
      "거창군", "합천군"
    ],
    "제주특별자치도": [
      "제주시", "서귀포시"
    ]
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedDistrict(""); // 시/군/구 초기화
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div id="region-section" >
      <button id="regionBtn" onClick={openModal}>지역 선택</button>
      <p id="selectedRegion">선택된 지역: {selectedRegion} {selectedDistrict}</p>

      <RegionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        regions={regions}
        onRegionSelect={handleRegionSelect}
        onDistrictSelect={handleDistrictSelect}
        selectedRegion={selectedRegion}
        selectedDistrict={selectedDistrict}
      />
    </div>
  );
}

export default RegionSelector;