export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};
