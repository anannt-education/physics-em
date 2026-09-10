/** Compatibility shims for gated instructor/expert pages. Public progress lives in store/student-store. */

type LegacyStore = {
  instructorUnlocked: boolean;
  expertUnlocked: boolean;
  attempts: { id: string }[];
};

let store: LegacyStore = { instructorUnlocked: false, expertUnlocked: false, attempts: [] };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function getStore() {
  return store;
}

export function resetStore() {
  store = { instructorUnlocked: false, expertUnlocked: false, attempts: [] };
  emit();
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
