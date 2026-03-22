/**
 * Customer-facing pages: venue gradient, safe area for bottom nav, readable max width.
 */
export function CustomerShell({
  children,
  className = "",
  /** Extra bottom padding when using CustomerBottomNav (e.g. pb-24) */
  bottomInsetClass = "pb-24",
  maxWidthClass = "max-w-lg",
}) {
  return (
    <div className={`customer-shell min-h-screen ${className}`}>
      <div
        className={`mx-auto w-full min-h-screen px-4 pt-4 sm:px-5 ${bottomInsetClass} ${maxWidthClass}`}
      >
        {children}
      </div>
    </div>
  );
}
