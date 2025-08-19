// 파일 상단 import 아래에 추가

type PaymentId = "kakao" | "toss" | "naver";

export const REQUIRED_PREFIX: Record<PaymentId, string> = {
  kakao: "https://qr.kakaopay.com/",
  toss: "supertoss://send",
  naver: "https://new-m.pay.naver.com/",
};

const DISPLAY_NAME: Record<PaymentId, string> = {
  kakao: "카카오페이",
  toss: "토스",
  naver: "네이버페이",
};

// 공백 정규화(비교용)
export const norm = (v: unknown) =>
  String(v ?? "")
    .trim()
    .replace(/\s+/g, " ");

// 계좌 문자열 정규화(은행/예금주는 공백 정리, 계좌번호는 숫자만)
export const normAccountBundle = (
  bank: string,
  name: string,
  number: string
) => {
  const b = norm(bank);
  const n = norm(name);
  const digits = String(number ?? "").replace(/\D/g, "");
  return `${b} ${n} ${digits}`;
};

// 프리픽스 검증
export const validateUrlPrefix = (id: PaymentId, value: string) => {
  const v = (value ?? "").trim();
  if (v === "")
    return { ok: true, value: "" as string, error: null as string | null };
  if (v.startsWith(REQUIRED_PREFIX[id]))
    return { ok: true, value: v, error: null };
  return {
    ok: false,
    value: v,
    error: `${DISPLAY_NAME[id]} URL은 "${REQUIRED_PREFIX[id]}" 로 시작해야 해요.`,
  };
};
