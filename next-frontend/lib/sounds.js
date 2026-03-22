/** Attention cues — respects `soundPreferences` (mute / volume). */

import { getSoundPreferences } from "./soundPreferences";

function effectiveGain(baseGain) {
  const { muted, volume } = getSoundPreferences();
  if (muted) return 0;
  return baseGain * volume;
}

function playOscillator(freq, durationMs, type = "sine", gainValue = 0.06) {
  if (typeof window === "undefined") return;
  const g = effectiveGain(gainValue);
  if (g <= 0) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(g, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationMs / 1000);
    setTimeout(() => ctx.close().catch(() => {}), durationMs + 50);
  } catch {
    // ignore
  }
}

function vibrate(pattern) {
  const { vibrate } = getSoundPreferences();
  if (!vibrate || typeof navigator === "undefined" || !navigator.vibrate) return;
  navigator.vibrate(pattern);
}

export function playKitchenNewOrder() {
  playOscillator(520, 140, "triangle", 0.08);
  setTimeout(() => playOscillator(780, 120, "triangle", 0.06), 100);
  vibrate([80, 40, 80]);
}

export function playWaiterReady() {
  playOscillator(660, 100, "sine", 0.07);
  setTimeout(() => playOscillator(880, 160, "sine", 0.07), 90);
  vibrate([60, 30, 60, 30, 120]);
}

export function playCustomerStatus() {
  playOscillator(440, 80, "sine", 0.05);
  vibrate(40);
}

/** Quick blip when adding to cart */
export function playAddToCart() {
  playOscillator(660, 55, "sine", 0.07);
  setTimeout(() => playOscillator(880, 45, "sine", 0.05), 45);
  vibrate(25);
}

export function playSuccess() {
  playOscillator(523, 90, "sine", 0.06);
  setTimeout(() => playOscillator(659, 100, "sine", 0.07), 70);
  setTimeout(() => playOscillator(784, 120, "sine", 0.06), 150);
  vibrate([30, 20, 40]);
}

export function playSoftError() {
  playOscillator(220, 120, "triangle", 0.05);
  setTimeout(() => playOscillator(180, 140, "triangle", 0.04), 80);
  vibrate([50, 40, 50]);
}

export function playTabSwitch() {
  playOscillator(440, 45, "sine", 0.04);
}

/**
 * Optional short UI clip from /sounds/*.mp3 — only if file exists and unmuted.
 * Falls back silently if missing.
 */
export function playUiSound(filename) {
  if (typeof window === "undefined") return;
  const g = effectiveGain(0.08);
  if (g <= 0) return;
  try {
    const audio = new Audio(`/sounds/${filename}`);
    audio.volume = Math.min(1, g / 0.08);
    audio.play().catch(() => {});
  } catch {
    // ignore
  }
}

export function maybeNotifyBrowser(title, body) {
  if (typeof window === "undefined" || typeof Notification === "undefined") return;
  if (Notification.permission === "granted") {
    try {
      new Notification(title, { body, silent: false });
    } catch {
      // ignore
    }
  }
}

export function requestNotificationPermission() {
  if (typeof window === "undefined" || typeof Notification === "undefined") return Promise.resolve("unsupported");
  if (Notification.permission !== "default") return Promise.resolve(Notification.permission);
  return Notification.requestPermission();
}
