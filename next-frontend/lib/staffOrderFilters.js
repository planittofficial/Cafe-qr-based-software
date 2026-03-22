/** Statuses hidden from kitchen live board (handed off or completed). */
const KITCHEN_LIVE_EXCLUDED = new Set(["ready", "served", "paid"]);

/** Statuses hidden from waiter live board (settled). */
const WAITER_LIVE_EXCLUDED = new Set(["paid"]);

export function isKitchenLiveOrder(order) {
  return order?.status && !KITCHEN_LIVE_EXCLUDED.has(order.status);
}

export function isWaiterLiveOrder(order) {
  return order?.status && !WAITER_LIVE_EXCLUDED.has(order.status);
}

export function filterKitchenLiveOrders(orders) {
  if (!Array.isArray(orders)) return [];
  return orders.filter(isKitchenLiveOrder);
}

export function filterWaiterLiveOrders(orders) {
  if (!Array.isArray(orders)) return [];
  return orders.filter(isWaiterLiveOrder);
}
