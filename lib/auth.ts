export type AuthSource = "login" | "register"

export const DEFAULT_LAST_NAME = "Rana"
export const DEFAULT_PHONE = "+91 98765 43210"
export const DEFAULT_PHONE_COUNTRY = "IN"

export type StoredSession = {
  firstName: string
  lastName: string
  email: string
  phone: string
  phoneCountry: string
  source: AuthSource
  createdAt: string
}

export const AUTH_STORAGE_KEY = "kraft-treasure-auth-session"
export const AUTH_EVENT = "kraft-treasure-auth-change"

function isBrowser() {
  return typeof window !== "undefined"
}

export function getStoredSession(): StoredSession | null {
  if (!isBrowser()) return null

  try {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!rawSession) return null

    const parsed = JSON.parse(rawSession) as Partial<StoredSession>
    if (!parsed.email) return null

    return {
      firstName: parsed.firstName?.trim() || "Collector",
      lastName: parsed.lastName?.trim() || DEFAULT_LAST_NAME,
      email: parsed.email,
      phone: parsed.phone?.trim() || DEFAULT_PHONE,
      phoneCountry: parsed.phoneCountry?.trim() || DEFAULT_PHONE_COUNTRY,
      source: parsed.source === "register" ? "register" : "login",
      createdAt: parsed.createdAt || new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function setStoredSession(session: StoredSession) {
  if (!isBrowser()) return

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function clearStoredSession() {
  if (!isBrowser()) return

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function getDisplayName(session: StoredSession) {
  const fullName = [session.firstName, session.lastName].filter(Boolean).join(" ").trim()
  if (fullName) return fullName

  const [localPart] = session.email.split("@")
  return localPart || "Collector"
}
