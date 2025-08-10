## 📌 프로젝트 소개

command-tracker는 스트리트파이터라는 1대1 격투 게임 영상에서 플레이어의 커맨드 입력을 자동 추출해 주는 서비스입니다.

일반적으로 커맨드가 영상에 포함되지 않은 경우, 녹화된 영상을 보며 수동으로 입력을 추정해야 하며, 이는 초보자에게 높은 진입장벽이 됩니다.

이 서비스는 RTMPose 기반의 관절 추출 모델과 후처리 로직을 활용하여, 플레이어의 동작을 분석하고 이를 커맨드로 변환, 최종적으로 자막 형태로 영상에 삽입해 줍니다. 이로써 초보자들도 원하는 캐릭터의 커맨드를 손쉽게 확인해 볼 수 있습니다.

> RTM-Pose는 사람의 관절 위치를 추정해주는 최신 인체 포즈 추정 AI 모델입니다.


## 🔗 링크  

<div align="center">
  
[웹사이트](https://commandtracker.co.kr/) | [클라이언트 레포지토리](https://github.com/ChaJunWoo-dev/command-tracker-frontend) | [AI 레포지토리](https://github.com/ChaJunWoo-dev/command-tracker-ai)

</div>


## ⚙️ 레포지토리 구성 및 역할

### 클라이언트 레포지토리
- 사용자가 분석할 유튜브 영상 주소를 입력하고 커맨드를 추출할 부분을 컷 편집할 수 있는 웹 UI 제공합니다.
- 사용자가 영상을 제출하고, 결과를 받을 이메일을 입력하는 인터페이스 제공합니다.
- 주요 기능
  - 유튜브 영상 링크 입력 UI
  - 이메일 입력 및 제출

### 웹 서버 레포지토리
- 클라이언트의 요청을 받아 저장하고, 작업 요청을 RabbitMQ로 발송하거나 결과를 수신하여 이메일로 최종 영상을 전송하는 Express API 서버입니다.
- 클라이언트와 AI 서버를 직접 연결하지 않고, 역할을 분담하여 유지보수성과 안정성을 증가. 이를 위한 중계 서버 역할을 합니다.
- 주요 기능
  - Youtube 영상 다운로드 처리
  - AI 서버로 작업 요청 메시지를 RabbitMQ에 발행
  - 추출 완료된 최종 영상의 URL을 받아 이메일로 전송
 
### AI 레포지토리
- RabbitMQ로부터 수신한 작업 요청을 기반으로, RTM-pose로 관절 추출 및 커맨드 인식을 수행하는 Python 서버입니다.
- 고성능 모델을 실행하고 비동기 큐 기반으로 독립된 연산 서버가 필요하여 별도로 분리된 서버입니다.
- 주요 기능
  - RTM-pose로 관절 위치 추정
  - 관절 위치 정보를 기반으로 커맨드 추정
  - 추정 결과를 자막에 담아 최종 영상 URL을 메시지 큐로 전송


## **🛠** 기술 스택

### 클라이언트

<span>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</span>

### 웹 서버

<span>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
</span>

### AI 서버

<span>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
</span>

### 서버 공통

<span>
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
  <img src="https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white">
</span>

### 배포

<span>
  <img src="https://img.shields.io/badge/vercel-E34F26?style=for-the-badge&logo=vercel&logoColor=black">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=black">
</span>

### RabbitMQ 도입 배경

영상 속 관절 추정을 하는 작업은 굉장히 오래 걸리는 작업입니다. 웹 요청으로 처리할 때 요청과 응답이 될 때까지 기다려야 할 뿐만 아니라 양측 서버 모두 안정성에 악영향을 끼칠 수 있습니다. 영상 분석 작업을 분리함으로써, 서버의 안정성을 확보했습니다. 

AI 서버는 단순히 큐를 소비하고, 결과물을 응답만 하면 되기 때문에, 웹 프레임워크 없이 동작할 수 있습니다. 이에 따라 AI 서버가 가벼워지고 라우팅 처리, HTTP 처리 등을 하지 않고 영상 분석 같은 주 로직에만 집중할 수 있습니다.

### Express 도입 배경

React를 사용하는 프론트엔드와 같이 Javascript기반으로, 개발 속도를 빠르게 끌어올릴 수 있습니다. 또한 미들웨어를 통한 요청 단에서의 검증을 앞단에서 처리하여 불필요한 업로드를 방지함으로써 서버 부하를 줄이고 응답 속도를 개선할 수 있었습니다. 

## 🧠기술적 챌린지

### 영상 컷 편집

사용자가 입력한 유튜브 링크에서 원하는 구간만 잘라 커맨드 추정에 사용하는 기능이 필요했습니다. 유튜브 영상의 길이는 다양하고, 전체 영상을 처리하기에는 자원 낭비가 크기 때문에 컷 편집은 필수였습니다. 처음에는 `ffmpeg`를 사용하여 유튜브 스트림을 그대로 pipe 처리하였고, 출력 확장자는 일반적으로 많이 사용하는 `.mp4`를 선택했습니다. 그러나 이 방식에서는 영상이 저장되지 않거나, 저장되더라도 영상이 깨지거나 디코딩 오류가 발생하는 문제가 반복되었습니다.

초기에는 스트림 처리 방식 자체에 문제가 있다고 판단하여, 임시 디렉터리에 파일로 저장한 후 편집을 수행해 보았습니다. 이 방식은 안정적으로 동작했지만, 사용자 요청마다 서버에 영상 파일이 남는 문제가 있었습니다. 이에 문제의 근본 원인을 찾기 위해 확장자를 조사하였고, 스트리밍 환경에 적합한 포맷인 `.webm`의 존재를 확인했습니다. 실험 결과 `.webm` 확장자를 사용할 때 pipe 스트리밍 방식에서도 영상이 안정적으로 저장되고 편집되는 것을 확인하였고, 이를 최종 구조로 채택하였습니다.

현재는 Node.js 서버에서 클라이언트로부터 전달받은 시작 점과 종료 점을 기반으로 `ffmpeg` 명령어를 실행하고, `.webm` 포맷으로 출력된 편집 영상 파일을 Google Cloud Storage 버킷에 업로드하고 있습니다. 

개선해야 할 점은 영상 편집에 대한 문제입니다. 현재 컷 편집에만 수십 초가 소요되며, 이에 따라 사용자에게 응답이 늦어지는 문제가 있습니다. 이를 개선하기 위해서는 해상도를 낮춰야 하지만, 해상도를 낮추는 건 사용자 측면과 AI 영상 분석 성능에 악영향을 끼치기 때문에, 다음과 같이 해결할 계획입니다. 요청과 동시에 성공 응답을 먼저 반환하고, 이후 내부적으로 컷 편집과 분석을 진행하여 UI적으로 해결할 예정입니다.

## 🔍 **작업 방식**

- **깃 브랜치 전략**
    
    Github Flow 전략을 채택했습니다. Git Flow는 develop, release, hotfix 등 브랜치가 많아서 관리가 복잡하고 작은 팀에서는 오히려 비효율적이라 생각했습니다. 반면 Github Flow는 main 브랜치를 기준으로 병합하기 때문에 빠른 개발 사이클을 가져갈 수 있어 개발 기간을 확보할 수 있다고 생각하여 적합하다고 판단했습니다. 
    
- **PR 규칙**
    
    PR 작성 시 이슈 번호를 반드시 포함하고 템플릿을 지켜 작성하였습니다. 내용에는 변경된 내용과 코드 리뷰어가 확인해야 할 부분을 간단히 명시하였습니다. 또한 팀원의 승인이 반드시 있어야 병합할 수 있도록 하여 실수로 인한 병합을 예방하였습니다.
    
- **협업 시 신경 썼던 부분**
  
감정을 배제한 의사소통을 유지했고, 오해 소지가 있는 표현은 즉시 정정했습니다. 변수명은 길더라도 명확하게 작성했으며, 수정 사항은 회의 때 공유 후 합의해 진행했습니다. 필요한 경우 참고 자료를 함께 제공해 소통 효율을 높였습니다.
    

## 📆 일정 및 팀원

진행 기간 : 5주

팀원 : 차준우, 조성경 (총 2명)

- 1주차
    - 아이디어 선정
    - POC 진행 - 캐릭터의 커맨드를 추정하기 위한 관절 데이터 추출 성능 확인
- 2주차
    - POC 진행 - 캐릭터의 커맨드를 추정하기 위한 관절 데이터 추출 성능 확인
    - 칸반 작성
    - 기술 스택 조사
- 3주차
    - 프로젝트 환경 세팅
    - 공통 컴포넌트 구현
    - 영상 편집 구현
    - 영상 업로드 구현
    - 결과물 확인 링크 메일 전송 구현
- 4주차
    - 영상 분석하여 관절 데이터 추출 구현
    - Re-ID 성능 테스트
    - 동작 학습 데이터 수집 및 AI 기반 커맨드 추출 테스트
    - 관절 데이터 기반 커맨드 추출 구현
- 5주차
    - 배포


## 💭 개인 회고

이번 프로젝트를 통해 단순히 기능을 구현하는 것을 넘어, 실제 사용자가 어떤 문제를 겪고 있는지를 정의하고, 그에 맞는 해결책을 설계하는 것이 얼마나 중요한지 체감했습니다. 또한, AI 기반 관절 추정을 처음에는 캐릭터별 학습 방식으로 구현했으나, 매번 라벨링·학습을 반복해야 해 유지보수 한계가 컸습니다. 이를 좌/우 캐릭터 구분 방식으로 전환하며, 기술적 완벽함보다 현실적 확장성을 우선하는 선택이 더 효율적일 수 있음을 배웠습니다.

### 아쉬운 점

AI 기반 커맨드 추정의 정확도에 대한 확신이 부족해, 필요한 수준보다 지나치게 완벽한 결과를 목표로 POC에 과도한 시간을 투입했습니다. 그 결과 설계가 지연되어 UX 개선과 코드 정리에 충분히 집중하지 못했습니다. 앞으로는 목표 수준을 현실적으로 설정하여 프로젝트 진행 속도를 높일 것입니다.

### 향후 개선 방향

- 커맨드 조건 정교화로 정확도 향상
- 스택형 자막 → 구간형 자막 개선
- 영상 처리 구조를 비동기화해 UX 개선
