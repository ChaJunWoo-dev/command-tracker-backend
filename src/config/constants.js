const MESSAGES = {
  SUCCESS: {
    VIDEO_REQUEST: "커맨드 분석 요청을 완료했습니다.",
    VALIDATION_PASSED: "검증 완료. 파일 업로드를 진행하세요.",
  },
  ERROR: {
    NOT_FOUND_PAGE: "페이지를 찾을 수 없습니다.",
    SERVER_ERROR: "서버 내부 오류가 발생했습니다.",
    MISSING_REQUIRED_FIELD: "필수 필드가 누락되었습니다.",

    INVALID_POSITION: "분석할 캐릭터 위치를 다시 선택해주세요.",
    INVALID_CHARACTER: "지원하지 않는 캐릭터입니다.",
    INVALID_EMAIL: "잘못된 이메일 형식입니다.",
    INVALID_FILE_TYPE: "비디오 파일만 업로드 가능합니다.",

    FAILED_UPLOAD_VIDEO: "비디오 업로드에 실패했습니다.",
    INVALID_TRIM: "편집 범위가 잘못되었습니다.",
    FAILED_READ_TEMPLATE: "이메일 템플릿 읽기에 실패했습니다.",

    INVALID_TOKEN: "권한이 없습니다.",
    MISSING_TOKEN: "인증되지 않은 접근입니다.",
  },
};

const JWT = {
  TOKEN_EXPIRE: "5m",
};

const CODE = {
  ERROR: {
    FAILED_ANALYZE: "FAILED_ANALYZE",
  },
};

const QUEUE = {
  VIDEO_PROCESS: "video_process_queue",
  VIDEO_RESULT: "video_result_queue",
};

const HTTP_STATUS = {
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
};

const VIDEO_MAX_SIZE = 500 * 1024 * 1024;

const VALID_VALUES = {
  POSITION: ["left", "right"],
  CHARACTER: [
    "AKI",
    "BLANKA",
    "CAMMY",
    "CHUN",
    "DEEJAY",
    "DHALSIM",
    "ED",
    "EDHONDA",
    "ELENA",
    "GOUKI",
    "GUILE",
    "JAMIE",
    "JP",
    "JURI",
    "KEN",
    "KIMBERLY",
    "LILY",
    "LUKE",
    "MAI",
    "MANON",
    "MARISA",
    "RASHID",
    "RYU",
    "TERRY",
    "VEGA",
    "ZANGIEF",
  ],
};

export {
  CODE,
  HTTP_STATUS,
  MESSAGES,
  REGEX_PATTERNS,
  VALID_VALUES,
  VIDEO_MAX_SIZE,
  QUEUE,
  JWT,
};
