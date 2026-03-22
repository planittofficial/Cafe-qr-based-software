"use client";

import { useEffect, useState } from "react";
import { getToken, getUser } from "./auth";

/**
 * Reads auth from session/localStorage only after mount so SSR and first client
 * paint match (avoids hydration mismatches from getToken/getUser in render).
 */
export function useClientAuth() {
  const [ready, setReady] = useState(false);
  const [token, setTokenState] = useState(null);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    setTokenState(getToken());
    setUserState(getUser());
    setReady(true);
  }, []);

  return { token, user, ready };
}
