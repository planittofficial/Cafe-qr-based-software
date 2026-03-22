const inputBase =
  "w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-orange-300/70 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70";

const sizes = {
  sm: "p-2.5 text-sm",
  md: "p-3 text-sm",
  lg: "p-4 text-base min-h-[48px]",
};

export function Input({ className = "", size = "md", ...props }) {
  return (
    <input
      className={`${inputBase} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = "", size = "md", ...props }) {
  return (
    <textarea
      className={`${inputBase} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    />
  );
}
