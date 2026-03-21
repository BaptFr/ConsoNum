import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'
import LoginCard from '@/components/ui/LoginCard'
import CookieBanner from '@/components/ui/CookieBanner'


// useAuth Mock for navabar 
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}))

// next/link Mock
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

// T12 — Navbar
describe('Navbar', () => {
  test('Le composant se rend sans erreur', () => {
    render(<Navbar />)
    expect(screen.getByText('CONSONUM')).toBeInTheDocument()
  })

  test('Affiche les liens Connexion et Inscription si non authentifié', () => {
    render(<Navbar />)
    expect(screen.getByText('Connexion')).toBeInTheDocument()
    expect(screen.getByText('Inscription')).toBeInTheDocument()
  })
})

// T13 — LoginCard
describe('LoginCard', () => {
  test('Le composant se rend sans erreur avec un titre', () => {
    render(<LoginCard title="Connexion">Contenu</LoginCard>)
    expect(screen.getByText('Connexion')).toBeInTheDocument()
  })

  test('Affiche le sous-titre si fourni', () => {
    render(
      <LoginCard title="Connexion" subtitle="Bienvenue"> 
        Contenu
      </LoginCard>
    )
    expect(screen.getByText('Bienvenue')).toBeInTheDocument()
  })
})

// T14 — CookieBanner
describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Le bandeau est visible si aucun consentement en localStorage', () => {
    render(<CookieBanner />)
    expect(screen.getByText("J'ai compris")).toBeInTheDocument()
  })

  test('Le bandeau disparaît après clic sur J\'ai compris', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText("J'ai compris"))
    expect(screen.queryByText("J'ai compris")).not.toBeInTheDocument()
  })

  test('Le bandeau ne s\'affiche pas si consentement déjà donné', () => {
    localStorage.setItem('cookie_consent', 'accepted')
    render(<CookieBanner />)
    expect(screen.queryByText("J'ai compris")).not.toBeInTheDocument()
  })
})