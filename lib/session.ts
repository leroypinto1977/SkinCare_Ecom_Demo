/* Mock auth session — demo only, stored in localStorage. */

export type DemoUser = {
  name: string;
  email: string;
  phone?: string;
};

const STORAGE_KEY = "aurelle-user";

export function getUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: DemoUser) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
