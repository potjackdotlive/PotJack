type Listener = () => void;

let now = Date.now();
const listeners = new Set<Listener>();
let interval: number | null = null;

function startTicker() {
  if (!interval) {
    interval = setInterval(() => {
      now = Date.now();
      listeners.forEach((fn) => fn());
    }, 1000) as unknown as number;
  }
}

function stopTicker() {
  if (listeners.size === 0 && interval) {
    clearInterval(interval);
    interval = null;
  }
}

export function subscribe(callback: Listener) {
  listeners.add(callback);
  startTicker();
  return () => {
    listeners.delete(callback);
    stopTicker();
  };
}

export function getSnapshot() {
  return now;
}
