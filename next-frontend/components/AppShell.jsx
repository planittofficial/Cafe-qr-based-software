/**
 * Marketing / generic full-width layout with optional max width and gradient shell.
 */
export function AppShell({
  children,
  className = "",
  maxWidthClass = "max-w-6xl",
  shellClass = "page-shell min-h-screen",
  innerClass = "",
  /** When true, skip inner wrapper padding (full-bleed content inside). */
  fullBleed = false,
}) {
  if (fullBleed) {
    return <div className={`${shellClass} ${className}`}>{children}</div>;
  }
  return (
    <div className={`${shellClass} ${className}`}>
      <div className={`mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 ${maxWidthClass} ${innerClass}`}>
        {children}
      </div>
    </div>
  );
}
