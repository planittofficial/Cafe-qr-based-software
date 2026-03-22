/** When set, customer app can call single-venue order APIs that use DEFAULT_CAFE_ID on the server */
export function getVenueIdFromEnv() {
  return process.env.NEXT_PUBLIC_VENUE_ID || "";
}

export function isVenueOrderApiEnabled() {
  return Boolean(getVenueIdFromEnv());
}
