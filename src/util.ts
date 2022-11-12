export function elementInFocus(el: HTMLElement): boolean {
  const { top, bottom } = el.getBoundingClientRect();
  const { innerHeight } = window;
  const halfWindow = innerHeight / 2;
  return top <= halfWindow && bottom > halfWindow;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
