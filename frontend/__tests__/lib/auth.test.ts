import { getToken, setToken, removeToken, isAuthenticated } from '@/lib/auth'

const TOKEN_KEY = 'token'

beforeEach(() => {
  localStorage.clear()
})

// T01
test('getToken retourne null si localStorage est vide', () => {
  const result = getToken()
  expect(result).toBeNull()
})

// T02
test('getToken retourne le token si présent', () => {
  localStorage.setItem(TOKEN_KEY, 'mon-token-test')
  const result = getToken()
  expect(result).toBe('mon-token-test')
})

// T03
test('setToken stocke le token dans le localStorage', () => {
  setToken('mon-token-test')
  expect(localStorage.getItem(TOKEN_KEY)).toBe('mon-token-test')
})

// T04
test('removeToken supprime le token du localStorage', () => {
  localStorage.setItem(TOKEN_KEY, 'mon-token-test')
  removeToken()
  expect(localStorage.getItem(TOKEN_KEY)).toBeNull()
})

// isAuthenticated
test('isAuthenticated retourne false si pas de token', () => {
  expect(isAuthenticated()).toBe(false)
})

test('isAuthenticated retourne true si token présent', () => {
  setToken('mon-token-test')
  expect(isAuthenticated()).toBe(true)
})
