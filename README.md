
# 전통-길
>전통시장으로 향하는 길


# 프로젝트 소개
>사용자가 선택한 지역에 있는 전통시장의 목록과 그들에 대한 정보를 제공하는 웹서비스입니다.
>
>Node.js 서버를 간단하게 구축하여 공공데이터포털의 데이터 API를 호출, 사용자에게 필요한 정보를 제공합니다.
>React를 사용해 FE를 구성했습니다.

> ### 개발 기간
>24.08.20 ~ 24.09.05

> ### 개발 인원
> 총 4명

# 주요 기능

### 1. 회원가입, 로그인
   - 사용자는 자신의 아이디, 비밀번호, 관심지역을 설정하여 회원가입을 할 수 있습니다.
   - 회원가입시 사용한 이메일과 비밀번호를 통해 로그인이 가능합니다.
   - 관리자 권한이 존재합니다.
       - 관리자 권한을 가진 사용자의 경우 공지사항 게시판에 글을 쓸 수 있습니다.

### 2. 지역 검색
   - 사용자가 자신이 원하는 지역을 시/군/구 단위로 검색할 수 있습니다.
       - 지역 선택 버튼을 통해 지역을 선택할 수 있으며, 선택된 지역에 해당하는 시장의 목록이 출력된다.
       - 이 때 시장의 목록은 시장 안에 있는 점포의 수가 많은 순서대로 출력된다.
       - 출력되는 시장의 수가 15개 이상일 경우, 점포의 수가 가장 많은 상위 15개의 시장만 출력된다.

### 3. 시장 정보 조회
  - 사용자가 2. 에서 제공하는 시장 목록 중 하나를 선택하면, 해당하는 시장에 대한 상세 정보를 출력합니다.
  - 상세정보에서 제공하는 정보로는
      1. 이름 및 주소
      2. 편의시설 여부 (주차장, 수유실 등)
      3. 온누리상품권 사용 가능 여부
      4. 주변 음식점 정보 (이름, 사진, 시장으로부터의 거리)
    등이 있습니다.

### 4. 지도
  - 선택된 지역의 지도를 제공합니다.
      - 지도에는 2.에서 출력되고 있는 시장의 위치에 핀이 찍혀있습니다.
      - 사용자가 시장을 선택하여 3.으로 넘어갔을 경우
          - 해당 시장의 주소가 유효하여 핀이 찍혀있을 경우, 해당 핀의 위치로 지도가 이동하며 핀이 강조됩니다.
            
      - 사용자는 지도, 지도의 핀과 상호작용을 할 수 있습니다.
          - 핀에 마우스를 올리면 해당하는 시장의 이름과 주소가 적힌 말풍선이 출력됩니다.
          - 핀을 클릭하면 해당하는 시장의 상세 정보가 조회됩니다. (3.의 기능과 동일)

### 5. 게시판
  - 사용자들끼리 소통할 수 있는 게시판입니다.
  - 공지사항과 QnA 게시판이 있습니다.
      - 공지사항의 경우 시장을 이용하는 데에 있어 중요한 사항이 있을 경우 관리자 권한을 가진 사용자가 글을 작성할 수 있도록 의도되었습니다.
      - QnA 게시판은 관리자 권한이 없는 사용자여도 게시글을 작성할 수 있습니다.


<div align="center"> 

### 🔧ᴜꜱɪɴɢ🔧
<img src="https://img.shields.io/badge/POSTMAN-FF6C37?style=flat-square&logo=postman&logoColor=white"/>
<img src="https://img.shields.io/badge/JAVASCRIPT-FFD95A?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/REACT-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/VISUAL%20STUDIO%20CODE-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/MYSQL-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white" />
<img src="https://img.shields.io/badge/GITHUB-181717?style=flat-square&logo=github&logoColor=white"/>


</div>

