function resolveAcceptToServeMs(order) {
  const direct = Number(order?.acceptToServeMs);
  if (Number.isFinite(direct) && direct >= 0) return direct;

  const acceptedAt = order?.acceptedAt ? new Date(order.acceptedAt).getTime() : NaN;
  const servedAt = order?.servedAt ? new Date(order.servedAt).getTime() : NaN;
  if (Number.isFinite(acceptedAt) && Number.isFinite(servedAt) && servedAt >= acceptedAt) {
    return servedAt - acceptedAt;
  }
  return null;
}

export function formatOrderAcceptToServe(order) {
  const ms = resolveAcceptToServeMs(order);
  if (!Number.isFinite(ms)) return "Not served yet";

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
