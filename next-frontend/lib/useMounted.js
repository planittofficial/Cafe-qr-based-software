"use client";

import { useEffect, useState } from "react";

/** True only after client mount — use to avoid SSR/client DOM mismatches (e.g. framer-motion). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
