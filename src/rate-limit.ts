const windows = new Map<string, { count: number; resetAt: number }>();

export function allowRequest(key: string, limit = 120, windowMs = 60_000): boolean {
  const now = Date.now();
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}
