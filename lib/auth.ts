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

export type RegisteredUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  phoneCountry: string
  createdAt: string
}

type AuthResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export const AUTH_STORAGE_KEY = "kraft-treasure-auth-session"
export const AUTH_USERS_STORAGE_KEY = "kraft-treasure-auth-users"
export const AUTH_EVENT = "kraft-treasure-auth-change"

function isBrowser() {
  return typeof window !== "undefined"
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function hasNameLikeValue(value?: string) {
  const trimmed = value?.trim() || ""
  return Boolean(trimmed) && !trimmed.includes("@")
}

function getRegisteredUsers(): RegisteredUser[] {
  if (!isBrowser()) return []

  try {
    const rawUsers = window.localStorage.getItem(AUTH_USERS_STORAGE_KEY)
    if (!rawUsers) return []

    const parsedUsers = JSON.parse(rawUsers) as Partial<RegisteredUser>[]
    if (!Array.isArray(parsedUsers)) return []

    return parsedUsers
      .filter((user) => typeof user?.email === "string" && typeof user?.password === "string")
      .map((user) => ({
        firstName: user.firstName?.trim() || "Collector",
        lastName: user.lastName?.trim() || DEFAULT_LAST_NAME,
        email: normalizeEmail(user.email || ""),
        password: user.password || "",
        phone: user.phone?.trim() || DEFAULT_PHONE,
        phoneCountry: user.phoneCountry?.trim() || DEFAULT_PHONE_COUNTRY,
        createdAt: user.createdAt || new Date().toISOString(),
      }))
  } catch {
    return []
  }
}

function setRegisteredUsers(users: RegisteredUser[]) {
  if (!isBrowser()) return

  window.localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(users))
}

export function findRegisteredUserByEmail(email: string): RegisteredUser | null {
  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) return null

  return getRegisteredUsers().find((user) => normalizeEmail(user.email) === normalizedEmail) || null
}

export function registerStoredUser(
  user: Omit<RegisteredUser, "createdAt"> & { createdAt?: string },
): AuthResult<RegisteredUser> {
  const normalizedEmail = normalizeEmail(user.email)
  if (!normalizedEmail) {
    return { ok: false, error: "Enter a valid email address." }
  }

  if (findRegisteredUserByEmail(normalizedEmail)) {
    return { ok: false, error: "An account with this email already exists. Please log in." }
  }

  const nextUser: RegisteredUser = {
    firstName: user.firstName.trim() || "Collector",
    lastName: user.lastName.trim() || DEFAULT_LAST_NAME,
    email: normalizedEmail,
    password: user.password,
    phone: user.phone?.trim() || DEFAULT_PHONE,
    phoneCountry: user.phoneCountry?.trim() || DEFAULT_PHONE_COUNTRY,
    createdAt: user.createdAt || new Date().toISOString(),
  }

  const users = getRegisteredUsers()
  users.unshift(nextUser)
  setRegisteredUsers(users)

  return { ok: true, data: nextUser }
}

export function authenticateStoredUser(email: string, password: string): AuthResult<RegisteredUser> {
  const user = findRegisteredUserByEmail(email)

  if (!user) {
    return { ok: false, error: "Register first before logging in with this email." }
  }

  if (user.password !== password) {
    return { ok: false, error: "Incorrect password." }
  }

  return { ok: true, data: user }
}

export function getStoredSession(): StoredSession | null {
  if (!isBrowser()) return null

  try {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!rawSession) return null

    const parsed = JSON.parse(rawSession) as Partial<StoredSession>
    const normalizedEmail = normalizeEmail(parsed.email || "")
    if (!normalizedEmail) return null

    const registeredUser = findRegisteredUserByEmail(normalizedEmail)
    const firstName = registeredUser?.firstName?.trim() || parsed.firstName?.trim() || ""
    const lastName = registeredUser?.lastName?.trim() || parsed.lastName?.trim() || ""

    if (!registeredUser && !hasNameLikeValue(firstName)) {
      return null
    }

    return {
      firstName: hasNameLikeValue(firstName) ? firstName : "Collector",
      lastName: hasNameLikeValue(lastName) ? lastName : DEFAULT_LAST_NAME,
      email: registeredUser?.email || normalizedEmail,
      phone: registeredUser?.phone?.trim() || parsed.phone?.trim() || DEFAULT_PHONE,
      phoneCountry: registeredUser?.phoneCountry?.trim() || parsed.phoneCountry?.trim() || DEFAULT_PHONE_COUNTRY,
      source: parsed.source === "register" ? "register" : "login",
      createdAt: parsed.createdAt || registeredUser?.createdAt || new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function setStoredSession(session: StoredSession) {
  if (!isBrowser()) return

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      ...session,
      email: normalizeEmail(session.email),
    }),
  )
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function clearStoredSession() {
  if (!isBrowser()) return

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function getDisplayName(session: StoredSession) {
  const fullName = [session.firstName, session.lastName]
    .filter((value) => hasNameLikeValue(value))
    .join(" ")
    .trim()

  return fullName || "Collector"
}