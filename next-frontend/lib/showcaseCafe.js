/** MongoDB cafeId for the marketing site to load `/api/menu/:cafeId` (browse only). */
export function getShowcaseCafeId() {
  return (
    process.env.NEXT_PUBLIC_SHOWCASE_CAFE_ID ||
    process.env.NEXT_PUBLIC_VENUE_ID ||
    ""
  ).trim();
}
