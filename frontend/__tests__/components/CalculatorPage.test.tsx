import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CalculatorPage from '@/app/calculator/page'
import { getToken } from '@/lib/auth'

jest.mock('@/lib/auth', () => ({ getToken: jest.fn() }))

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

jest.mock('next/link', () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return React.createElement('a', { href }, children)
    }
})

//HeroUI fixes
jest.mock('@heroui/react', () => ({
  Card: ({ children }: any) => React.createElement('div', null, children),
  CardHeader: ({ children }: any) => React.createElement('div', null, children),
  CardBody: ({ children }: any) => React.createElement('div', null, children),
  Spinner: () => React.createElement('div', { 'aria-label': 'Loading' }),
  Button: ({ children, onPress, isDisabled }: any) =>
    React.createElement('button', { onClick: onPress, disabled: isDisabled }, children),
  RadioGroup: ({ children, onValueChange }: any) =>
    React.createElement(
      'div',
      null,
      React.Children.map(children, (child) =>
        React.cloneElement(child, { onValueChange })
      )
    ),
  Radio: ({ children, value, onValueChange }: any) =>
    React.createElement(
      'label',
      null,
      React.createElement('input', {
        type: 'radio',
        value,
        'data-testid': `radio-${value}`,
        onChange: () => onValueChange && onValueChange(value),
      }),
      children
    ),
}))


const mockGetToken = getToken as jest.Mock

const mockQuestions = [
    {
        id: 1,
        texte: "Combien d'heures par jour sur votre smartphone ?",
        categorie: 'Usage mobile',
        type: 'simple',
        reponses: [
            { id: 1, texte: "Moins d'1 heure", valeur: 1 },
            { id: 2, texte: 'Entre 1 et 3 heures', valeur: 3 },
        ],
    },
    {
        id: 2,
        texte: "Combien d'appareils numériques possédez-vous ?",
        categorie: 'Equipement',
        type: 'simple',
        reponses: [
            { id: 3, texte: 'Moins de 3', valeur: 1 },
            { id: 4, texte: 'Entre 3 et 5', valeur: 3 },
        ],
    },
]

beforeEach(() => {
    jest.clearAllMocks()
})

// T22
test('Redirection vers /login si pas de token', () => {
    mockGetToken.mockReturnValue(null)
    global.fetch = jest.fn()
    render(<CalculatorPage />)
    expect(mockPush).toHaveBeenCalledWith('/login')
})

// T23
test('Affichage du Spinner pendant le chargement', () => {
    mockGetToken.mockReturnValue('fake-token')
    global.fetch = jest.fn().mockReturnValue(new Promise(() => { }))
    render(<CalculatorPage />)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
})

// T24
test('Rendu des questions après chargement', async () => {
    mockGetToken.mockReturnValue('fake-token')
    global.fetch = jest.fn().mockResolvedValue({
        json: async () => mockQuestions,
    })

    render(<CalculatorPage />)

    await waitFor(() => {
        expect(screen.getByText("Combien d'heures par jour sur votre smartphone ?")).toBeInTheDocument()
    })
})

// T25
test('Bouton désactivé si réponses incomplètes', async () => {
    mockGetToken.mockReturnValue('fake-token')
    global.fetch = jest.fn().mockResolvedValue({
        json: async () => mockQuestions,
    })

    render(<CalculatorPage />)

    await waitFor(() => {
        expect(screen.getByText("Combien d'heures par jour sur votre smartphone ?")).toBeInTheDocument()
    })

    expect(screen.getByText('Calculer mon score').closest('button')).toBeDisabled()
})

// T26
test("Affichage de l'écran résultat après soumission complète", async () => {
  mockGetToken.mockReturnValue('fake-token')

  let callCount = 0
  global.fetch = jest.fn().mockImplementation(() => {
    callCount++
    if (callCount === 1) {
      return Promise.resolve({
        ok: true,
        json: async () => mockQuestions,
      })
    }
    return Promise.resolve({
      ok: true,
      json: async () => ({ id: 1, score: 2 }),
    })
  })

  render(<CalculatorPage />)

  await waitFor(() => {
    expect(screen.getByText("Combien d'heures par jour sur votre smartphone ?")).toBeInTheDocument()
  })

  const firstRadios = screen.getAllByTestId('radio-1')
  fireEvent.change(firstRadios[0])
  fireEvent.change(firstRadios[1])

  await waitFor(() => {
    expect(screen.getByText('Calculer mon score').closest('button')).not.toBeDisabled()
  })

  fireEvent.click(screen.getByText('Calculer mon score').closest('button')!)

  await waitFor(() => {
    expect(screen.getByText('Votre Résultat')).toBeInTheDocument()
  })
})