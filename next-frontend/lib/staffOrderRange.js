/** ISO range for “today” in the browser’s local timezone */
export function todayISOStringRange() {
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  const to = new Date();
  return { from: from.toISOString(), to: to.toISOString() };
}

export function ordersTodayQueryString() {
  const { from, to } = todayISOStringRange();
  return new URLSearchParams({ from, to }).toString();
}

export function isOrderInLocalToday(order) {
  if (!order?.createdAt) return true;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return new Date(order.createdAt) >= start;
}
