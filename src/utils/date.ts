const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-07-10" 같은 date 문자열을 오늘/어제 기준 상대 라벨로 바꿔줘요. */
export function formatGroupLabel(date: string, today = new Date()) {
  const target = new Date(`${date}T00:00:00`);
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diffDays = Math.round(
    (todayStart.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";

  const weekday = WEEKDAYS[target.getDay()];
  return `${target.getMonth() + 1}월 ${target.getDate()}일 ${weekday}요일`;
}

/** "2026-07-10" -> "7월 10일" */
export function formatShortDate(date: string) {
  const [, month, day] = date.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

/** "2026-07-10" -> "목" */
export function formatWeekday(date: string) {
  const target = new Date(`${date}T00:00:00`);
  return WEEKDAYS[target.getDay()];
}

/** "2026-07-10" -> "2026년 7월 10일" */
export function formatFullDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}
