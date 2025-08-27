export const formatDate = (iso: string) => {
  const date = new Date(iso);

  // UTC 기준 시각을 가져와서 KST(+9)로 변환
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return `${kst.getFullYear()}년 ${
    kst.getMonth() + 1
  }월 ${kst.getDate()}일 ${String(kst.getHours()).padStart(2, "0")}:${String(
    kst.getMinutes()
  ).padStart(2, "0")}`;
};
