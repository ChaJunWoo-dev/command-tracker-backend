## 📌 프로젝트 소개

커맨드 트래커는 1대1 격투 게임 '스트리트파이터6' 영상에서 플레이어의 커맨드 입력을 자막화해주는 서비스입니다.

커맨드 시스템에 익숙치 않은 초보자는 영상을 보며 일일이 입력을 추정해야 하며, 이는 높은 진입장벽이 됩니다.

이 서비스는 AI 기반 관절 추출 모델과 후처리 알고리즘을 활용하여 플레이어의 동작을 분석하고, 이를 커맨드로 변환한 뒤 영상에 표시합니다.

덕분에 초보자도 원하는 캐릭터의 커맨드를 손쉽게 확인할 수 있습니다.

## 🔗 링크

<div align="center">

[시연 영상](https://drive.google.com/file/d/1bkSmT2jVh1yR19HSS-pmg3K0qPOkGw3N/view?usp=sharing) | [클라이언트 레포지토리](https://github.com/ChaJunWoo-dev/command-tracker-frontend) | [워커 서버 레포지토리](https://github.com/ChaJunWoo-dev/command-tracker-video-worker)

</div>

## ⚙️ 레포지토리 구성 및 역할

### 클라이언트 레포지토리

- 사용자가 분석할 영상을 업로드하고 컷 편집할 수 있는 웹 UI를 제공합니다.
- 분석할 캐릭터 위치, 캐릭터 선택, 이메일 입력 폼을 제공합니다.
- 주요 기능
  - 영상 업로드 및 편집 UI
  - 캐릭터 위치, 캐릭터 선택, 이메일 입력 폼
  - API 서버로 영상 전송

### API 서버 레포지토리

- JWT 토큰을 검증한 후 사용자의 S3 영상 업로드 요청을 처리하고, 메시지 큐를 통해 워커 서버로 작업을 전달합니다.
- 최종 결과물의 접근 URL을 발급하여 이메일로 전송합니다.
- 클라이언트와 워커 서버 간의 중계 역할을 수행하여 유지보수성과 안정성을 높입니다.
- 주요 기능
  - 사용자 입력 값 검증 및 JWT 토큰 발급
  - JWT 토큰 검증 후 S3 영상 업로드 처리
  - 메시지 큐를 통해 워커 서버에 작업 요청 발행
  - 결과물 presigned URL 발급 및 이메일 전송

### 워커 서버 레포지토리

- 메시지 큐로부터 수신한 작업 요청을 기반으로, 영상 컷 편집과 AI 기반 커맨드 분석을 수행하는 Python 서버입니다.
- 주요 기능
  - FFmpeg를 이용한 영상 컷 편집
  - AI 모델을 활용한 플레이어 동작 분석 및 커맨드 추정
  - 멀티 스레딩을 통한 AI 분석 병렬 처리
  - 추정 결과를 이미지 오버레이로 영상에 삽입 후 S3업로드

## 📑 목차

- [🛠 기술 스택](#-기술-스택)
  - [클라이언트](#클라이언트)
  - [RabbitMQ 도입 배경](#rabbitmq-도입-배경)
  - [Express 도입 배경](#express-도입-배경)
- [🚀 핵심 기능](#-핵심-기능)
  - [영상 업로드](#영상-업로드)
  - [영상 편집점 설정](#영상-편집점-설정)
  - [영상, 분석할 캐릭터 정보, 편집점 제출](#영상-분석할-캐릭터-정보-편집점-제출)
  - [영상 분석](#영상-분석)
  - [메일로 분석 결과 확인하기](#메일로-분석-결과-확인하기)
- [🧠 기술적 챌린지](#-기술적-챌린지)
  - [영상 업로드 처리](#영상-업로드-처리)
  - [배포 환경에서 발생한 영상 업로드 문제](#배포-환경에서-발생한-영상-업로드-문제)
  - [엔드포인트 분리와 토큰 기반 업로드 검증](#엔드포인트-분리와-토큰-기반-업로드-검증)
- [🔍 작업 방식](#-작업-방식)
  - [깃 브랜치 전략](#깃-브랜치-전략)
  - [PR 규칙](#pr-규칙)
  - [협업 시 신경 썼던 부분](#협업-시-신경-썼던-부분)
- [📆 일정 및 팀원](#-일정-및-팀원)
- [💭 개인 회고](#-개인-회고)
  - [아쉬운 점](#아쉬운-점)
  - [향후 개선 방향](#향후-개선-방향)

## **🛠** 기술 스택

### 클라이언트

<span>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</span>

### API 서버

<span>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
</span>

### 워커 서버

<span>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
  <img src="https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white">
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
</span>

### 배포

<span>
  <img src="https://img.shields.io/badge/vercel-E34F26?style=for-the-badge&logo=vercel&logoColor=black">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=black">
  <img src="https://img.shields.io/badge/CloudAMQP-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
</span>

### RabbitMQ 도입 배경

영상 분석 및 커맨드 추정 작업은 연산 비용이 높고 처리 시간이 긴 작업입니다. 이를 HTTP 요청–응답 구조로 처리할 경우, 요청 대기 시간이 길어질 뿐만 아니라 웹 서버와 AI 서버 모두의 안정성에 부정적인 영향을 줄 수 있습니다.

이에 따라 영상 분석 작업을 메시지 큐 기반으로 분리하여 비동기 처리 구조로 전환했습니다. 웹/API 서버는 작업 요청만 큐에 발행하고 즉시 응답하며, 워커 서버는 큐를 소비하여 독립적으로 연산을 수행합니다. 이를 통해 서버 간 결합도를 낮추고 안정적인 처리가 가능합니다.

또한 AI 워커 서버는 메시지 큐 소비와 결과 처리만 담당하므로, 웹 프레임워크 없이 동작할 수 있습니다. 그 결과 HTTP 라우팅이나 요청 처리 오버헤드를 제거하고, 영상 편집이나 분석과 같은 핵심 연산 로직에만 집중할 수 있도록 구성했습니다.

### Express 도입 배경

프론트엔드가 React 기반으로 구성되어 있고, 동일한 JavaScript 생태계인 Express를 API 서버로 채택함으로써 개발 생산성을 높일 수 있었습니다.

또한 Express의 미들웨어 구조를 활용해 사용자 입력 값 검증과 JWT 토큰 검증을 요청 초기에 처리함으로써, 유효하지 않은 요청에 대한 불필요한 S3 업로드 및 후속 작업을
사전에 차단했습니다. 이를 통해 서버 부하를 줄이고 전체 응답 속도를 개선했습니다.

## 🚀 핵심 기능

### 영상 업로드

<details>
<summary>🖼️ 미리보기</summary>

<br>

  <img width="1270" height="634" alt="Image" src="https://github.com/user-attachments/assets/c2f0c9d5-5ddd-43a0-9f34-7babb52ba94e" />

</details>

- 사용자가 분석하고 싶은 영상을 업로드합니다.

### 영상 편집점 설정

<details>
<summary>🖼️ 미리보기</summary>

<br>

  <img width="1273" height="627" alt="Image" src="https://github.com/user-attachments/assets/345e5689-88ee-4fc2-af6d-caf3b7319818" />

</details>

- 비디오 플레이어를 통해 영상을 확인하며 편집점을 정합니다.
- 영상 아래 트리머를 마우스로 이동하여 편집점을 설정합니다.

### 영상, 분석할 캐릭터 정보, 편집점 제출

<details>
<summary>🖼️ 미리보기</summary>

<br>

  <img width="1275" height="632" alt="Image" src="https://github.com/user-attachments/assets/bab18a6a-d7db-4128-aa25-919ee96c0511" />

</details>

- 영상 편집 이후 이어지는 페이지입니다.
- 분석할 캐릭터의 정보(위치, 이름)를 선택하고, 결과를 받을 이메일을 입력합니다.
- 제출 버튼을 눌러 영상, 캐릭터 정보, 이메일을 서버로 최종 제출합니다.

### 영상 분석(워커 서버 내부)

<details>
<summary>🖼️ 미리보기</summary>

<br>

<img width="1276" height="631" alt="Image" src="https://github.com/user-attachments/assets/f739c9a7-a0f5-41d1-ab17-5e0a6788d4c3" />

위 사진은 서버에서 내부적으로 분석할 때 사용되는 캐릭터들의 관절 정보이며, 사용자에게는 보이지 않습니다.

</details>

- 워커 서버로 전송된 영상은 사용자 정보를 기반으로 분석을 시작합니다.
- 캐릭터의 정보(위치, 이름)를 기반으로 원하는 캐릭터를 분석합니다.
- 분석 관련 사진은 미리보기를 참고해주세요.

### 메일로 분석 결과 확인하기

<details>
<summary>🖼️ 미리보기</summary>

<br>

  <img width="1276" height="631" alt="Image" src="https://github.com/user-attachments/assets/8bc2dd5d-ead1-4a4b-9055-b3234db5f8c8" />

<img width="1276" height="631" alt="Image" src="https://github.com/user-attachments/assets/1e2d63e7-5b0a-4c5f-9ad2-09e92b98dba3" />

</details>

- 분석이 완료되면 사용자가 입력했던 이메일로 영상 다운로드 링크를 전송합니다.
- 사용자는 영상을 다운로드 받아서 캐릭터 커맨드를 확인할 수 있습니다.
- 영상 좌측 하단에 스택 형태로 쌓이는 커맨드를 확인할 수 있습니다.

## 🧠 기술적 챌린지

### 요약

- 대용량 영상 업로드 처리 시, 서버 메모리 사용량 최소화와 구현 복잡도를 줄이기 위해 multer-s3 기반 스트림 업로드 방식을 도입
- Elastic Beanstalk 환경에서 발생한 413 Request Entity Too Large 오류의 원인이 애플리케이션이 아닌 Nginx 설정에 있음을 파악하고, .platform 디렉토리를 활용해 nginx설정 값 변경
- multipart/form-data 특성상 입력값 검증이 업로드 이후로 밀리는 문제를, 엔드포인트 분리와 JWT 기반 2단계 업로드 구조로 해결하여 불필요한 대용량 업로드를 사전에 차단

---

### 영상 업로드 처리

클라이언트가 업로드한 영상 데이터가 HTTP 요청 바디 스트림 형태로 전달되었고, 이를 S3로 업로드해야 했습니다.

#### 비교

먼저 첫 번째 방식은 AWS S3 SDK를 서버에서 직접 사용하는 방식입니다.
클라이언트가 업로드한 요청을 서버가 직접 수신한 뒤,
서버 코드에서 AWS S3 SDK의 PutObject 또는 Multipart Upload 메서드를 호출하여 S3로 업로드하는 방식입니다.

이 방식에는 다음과 같은 문제점이 존재했습니다.

업로드 데이터 전체를 서버가 직접 수신해야 하므로,
서버 메모리 또는 디스크 사용량이 증가할 수 있습니다.

HTTP 요청 바디 스트림을 서버 코드에서 직접 처리해야 하며,
스트림 분할, 파이프라인 구성, 예외 처리 등을 모두 직접 구현해야 합니다.

Multipart Upload를 사용하더라도,
HTTP 스트림을 Part 단위로 나누고 업로드 상태를 관리하는 로직은 서버 책임으로 남습니다.

다음은 multer를 사용하는 방식입니다.
multer는 Node.js 환경에서 HTTP 요청 바디의 multipart/form-data를 처리하는 미들웨어입니다.

이 방식에서는 HTTP 요청 바디를 multer 미들웨어가 파싱하며,
파일 데이터를 서버의 디스크나 메모리에 저장하지 않고
스트림 형태로 즉시 S3로 전달하는 방식으로 동작합니다.

#### 해결방법

본 프로젝트에서는 multer 기반 스트림 업로드 방식을 선택하였습니다.
선택 이유는 다음과 같습니다.

서버 자원 보호 및 안정성 확보
업로드 데이터를 서버 메모리나 디스크에 적재하지 않고 스트림으로 전달함으로써,
대용량 파일 업로드 시에도 서버 자원 사용을 최소화할 수 있었습니다.

구현 복잡도 대비 높은 안정성
HTTP 스트림 파이프라인 구성, 예외 처리, 에러 전파 등을
직접 구현하지 않아도 되며,
파일 크기 제한, MIME 타입 검증 등을 미들웨어 레벨에서 처리할 수 있었습니다.

직접 AWS S3 SDK를 사용함으로써 얻을 수 있는 높은 유연성보다,
구현 복잡도 감소와 운영 부담 감소로 얻는 이점이
본 프로젝트의 규모와 요구사항에 더 적합하다고 판단하였습니다.

#### 개선 계획

S3 Multipart Upload 방식을 도입하여 용량 제한을 높이고 업로드 안정성을 강화할 계획입니다.

### 배포 환경에서 발생한 영상 업로드 문제

AWS Elastic Beanstalk으로 배포한 상황에서 클라이언트 업로드 요청 시 413 Request Entity Too Large 에러 발생했습니다.

#### 원인 분석

로컬 환경에서는 정상 동작하던 부분이였기 때문에 디버깅을 진행했습니다.

디버깅 결과, 애플리케이션 로직 이전에 실패가 이루어지고 있었고, 찾아본 결과 nginx 기본 설정값이 원인이었습니다.

nginx의 `client_max_body_size` 기본 값이 1MB였고, 해당 제한을 초과하는 영상 업로드 작업이 nginx단에서 차단되고 있었습니다.

#### 해결 방법

Elastic Beanstalk에서 제공하는
Nginx 설정 오버라이드 방식을 사용하여 문제를 해결하였습니다

`.platform` 디렉토리는 Elastic Beanstalk의 서버 설정을 알려주는 폴더입니다. EC2에 직접 접근하지 않고도 설정을 반영해주는 방법입니다.

```
# .platform/nginx/conf.d/proxy.conf
client_max_body_size 500M;
```

위와 같이 파일을 만들어, 업로드 요청이 정상적으로 처리되도록 nginx 설정을 수정하였습니다.

> 현재는 서비스에서 500MB 이상의 영상을 받지 않고 있어 위와 같이 설정했습니다.

### 엔드포인트 분리와 토큰 기반 업로드 검증

클라이언트는 영상 파일뿐 아니라
캐릭터 위치, 캐릭터 이름, 사용자 이메일 등의 메타데이터를 영상과 함께
multipart/form-data 형태로 한 번에 전송하고 있었습니다.

서버에서는 multer-s3를 사용하여
HTTP 요청 바디 스트림을 직접 S3로 업로드하는 구조를 사용하고 있었으며,
동시에 사용자 입력값에 대한 검증 미들웨어가 필요했습니다.

#### 문제 상황

multipart/form-data에서
body에 들어 있는 필드들은 multer가 파싱해야 접근 가능합니다. 즉, 클라이언트 요청을 바디 파서가 받는 순간, multer는 HTTP바디 스트림에 접근할 수 없게 되어 업로드가 불가합니다.
이 특성 때문에 검증보다 multer-s3가 앞단 미들웨어로 실행되어야 합니다.

```
불가: router.post("/upload", 입력값 검증 미들웨어, 영상 업로드 미들웨어, videoController);
가능: router.post("/upload", 영상 업로드 미들웨어, 입력값 검증 미들웨어, videoController);
```

하지만 이러한 구조는 영상 업로드가 검증보다 앞서 실행되기 때문에, 잘못된 입력값이 들어오는 경우, 이미 S3에 업로드한 영상을 삭제해야 하는 문제가 있었습니다.
즉, 수백 MB의 영상이 먼저 S3에 업로드된 뒤에서야 요청이 실패할 수 있는 상황이었습니다.

#### 해결 방법

메타데이터 검증과 영상 업로드를 분리한 2단계 API 구조로 변경하고 JWT를 이용해 이전 요청에 대한 유효성을 보장했습니다.

> 기존 엔드포인트 : `/video`

> 수정 엔드포인트 : `/prepare`, `/upload`

실행 과정은 다음과 같습니다.

[1단계: /prepare]
첫번째 요청에서 메타 데이터를 먼저 검증하고, 이상이 없는 경우 JWT 토큰을 발급합니다.
토큰의 유효 시간은 5분으로 매우 짧게 설정했습니다.

[2단계: /upload]
클라이언트 → 토큰 + 파일 전송 → 토큰 검증 → S3 업로드

위처럼 요청을 2개로 분리한 덕분에 메타데이터 검증 후, 영상 업로드가 수행되는 로직으로 변경할 수 있었습니다.

```
router.post("/upload", tokenValidation, upload.single("video"), videoController);
```

## 🔍 **작업 방식**

### 깃 브랜치 전략

Github Flow 전략을 채택했습니다. Git Flow는 develop, release, hotfix 등 브랜치가 많아서 관리가 복잡하고 작은 팀에서는 오히려 비효율적이라 생각했습니다. 반면 Github Flow는 main 브랜치를 기준으로 병합하기 때문에 빠른 개발 사이클을 가져갈 수 있어 개발 기간을 확보할 수 있다고 생각하여 적합하다고 판단했습니다.

### PR 규칙

PR 작성 시 이슈 번호를 반드시 포함하고 템플릿을 지켜 작성하였습니다. 내용에는 변경된 내용과 코드 리뷰어가 확인해야 할 부분을 간단히 명시하였습니다. 또한 팀원의 승인이 반드시 있어야 병합할 수 있도록 하여 실수로 인한 병합을 예방하였습니다.

### 협업 시 신경 썼던 부분

의견 충돌이 발생할 수 있는 상황에서도 감정적인 표현을 배제하고, 사실과 근거 중심으로 의사소통했습니다.

예를 들어 관절 좌표 데이터를 커맨드로 변환하는 방식에 대해, 좌·우 캐릭터 위치를 기준으로 규칙 기반으로 처리할지, AI 기반 트래커를 사용할지에 대해 팀 내에서 의견이 나뉜 적이 있습니다.

이 과정에서 각자가 제안한 방식을 직접 구현 및 테스트한 뒤, 결과를 비교·검증하는 방식으로 추가 논의를 진행했고, 성능과 안정성 측면에서 더 적합한 방안을 최종적으로 채택했습니다.

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

AI 기반 커맨드 추정의 정확도에 대한 확신이 부족해, 필요한 수준보다 지나치게 완벽한 결과를 목표로 POC에 과도한 시간을 투입했습니다. 이로 인해 POC 단계에서 모델 구조, 조건식, 예외 케이스 보정에 과도한 시간을 투입하게 되었고, 결과적으로 전체 시스템 설계와 개발 일정이 지연되었습니다.

사용자 경험 개선 고려나 코드 구조 정리, 인프라 단순화같은 제품 완성도를 높이는 작업에 충분한 시간을 들이지 못한 점이 아쉬움으로 남습니다.
앞으로는 목표 수준을 현실적으로 설정하여 기술적 완성도와 개발 속도 사이의 균형을 보다 전략적으로 관리할 계획입니다.

### 향후 개선 방향

- 캐릭터별 커맨드 추가 매핑
