import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/features/auth/LoginForm'

// useAuth Mock
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
  }),
}))

// useRouter Mock
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// next/link Mock 
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return React.createElement('a', { href }, children)
  }
})

// T19
test('Rendu des champs email et mot de passe', () => {
  render(<LoginForm />)
  expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('*********')).toBeInTheDocument()
})

// T20
test("Message d'erreur si soumission avec champs vides", async () => {
  render(<LoginForm />)
  const form = document.querySelector('form')
  if (form) fireEvent.submit(form)
  expect(await screen.findByText('Tous les champs sont requis.')).toBeInTheDocument()
})

// T21
test('Saisie dans les champs mise à jour correctement ', async () => {
  render(<LoginForm />)
  const emailInput = screen.getByPlaceholderText('votre@email.com')
  const passwordInput = screen.getByPlaceholderText('*********')
  
  await userEvent.type(emailInput, 'test@test.com')
  await userEvent.type(passwordInput, 'motdepasse')

  expect(emailInput).toHaveValue('test@test.com')
  expect(passwordInput).toHaveValue('motdepasse')
})