// 테이블 번호별 색상 정의 (1번-30번)
const tableColors = [
  "#576376",
  "#CEB4F0",
  "#A5B8D6",
  "#84A6AD",
  "#788FB6",
  "#99a3b4",
  "#6C707A",
  "#898BBC",
  "#95C8BC",
  "#B4B4B4",
  "#3C485C",
  "#A27FCF",
  "#849CC3",
  "#5F8992",
  "#5472A3",
  "#6B7C99",
  "#4B4F59",
  "#6B6D9B",
  "#6FA99B",
  "#929292",
  "#3C485C",
  "#875FBB",
  "#6484B7",
  "#4C6E75",
  "#3F5A86",
  "#52637F",
  "#3E4045",
  "#4C4E75",
  "#507F74",
  "#767676",
];

export const getTableBackgroundColor = (tableNumber: number): string => {
  // 1-30번 범위 체크
  if (tableNumber < 1 || tableNumber > 30) {
    return "#6C707A"; // 범위 외 색상
  }

  return tableColors[tableNumber - 1];
};
