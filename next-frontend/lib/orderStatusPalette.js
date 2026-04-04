function normalizeStatus(status) {
  const value = String(status || "").toLowerCase().trim();
  return value === "baking" ? "preparing" : value;
}

const STATUS_STYLES = {
  pending: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#b91c1c" },
    headerStyle: { backgroundColor: "#991b1b" },
    bodyStyle: { backgroundColor: "#b91c1c" },
    panelStyle: { backgroundColor: "#fca5a5" },
    pillStyle: { backgroundColor: "#991b1b", borderColor: "#fca5a5" },
  },
  accepted: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-stone-950",
    cardStyle: { backgroundColor: "#facc15" },
    headerStyle: { backgroundColor: "#eab308" },
    bodyStyle: { backgroundColor: "#facc15" },
    panelStyle: { backgroundColor: "#fef08a" },
    pillStyle: { backgroundColor: "#fde047", borderColor: "#fef08a" },
  },
  preparing: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#c2410c" },
    headerStyle: { backgroundColor: "#9a3412" },
    bodyStyle: { backgroundColor: "#c2410c" },
    panelStyle: { backgroundColor: "#fdba74" },
    pillStyle: { backgroundColor: "#9a3412", borderColor: "#fdba74" },
  },
  ready: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#15803d" },
    headerStyle: { backgroundColor: "#166534" },
    bodyStyle: { backgroundColor: "#15803d" },
    panelStyle: { backgroundColor: "#86efac" },
    pillStyle: { backgroundColor: "#166534", borderColor: "#86efac" },
  },
  served: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#0369a1" },
    headerStyle: { backgroundColor: "#075985" },
    bodyStyle: { backgroundColor: "#0369a1" },
    panelStyle: { backgroundColor: "#7dd3fc" },
    pillStyle: { backgroundColor: "#0c4a6e", borderColor: "#bae6fd" },
  },
  paid: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#4338ca" },
    headerStyle: { backgroundColor: "#3730a3" },
    bodyStyle: { backgroundColor: "#4338ca" },
    panelStyle: { backgroundColor: "#a5b4fc" },
    pillStyle: { backgroundColor: "#312e81", borderColor: "#c7d2fe" },
  },
  rejected: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-200/80",
    pillClassName: "text-white",
    cardStyle: { backgroundColor: "#be123c" },
    headerStyle: { backgroundColor: "#9f1239" },
    bodyStyle: { backgroundColor: "#be123c" },
    panelStyle: { backgroundColor: "#fda4af" },
    pillStyle: { backgroundColor: "#881337", borderColor: "#fecdd3" },
  },
  default: {
    cardClassName: "border-slate-200/90",
    panelClassName: "border-slate-100",
    pillClassName: "text-slate-800",
    cardStyle: { backgroundColor: "#ffffff" },
    headerStyle: { backgroundColor: "#f8fafc" },
    bodyStyle: { backgroundColor: "#ffffff" },
    panelStyle: { backgroundColor: "#ffffff" },
    pillStyle: { backgroundColor: "#ffffff", borderColor: "#cbd5e1" },
  },
};

export function getOrderStatusPalette(status) {
  const normalized = normalizeStatus(status);
  return {
    normalized,
    ...(STATUS_STYLES[normalized] || STATUS_STYLES.default),
  };
}
