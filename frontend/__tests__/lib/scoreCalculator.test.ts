import { calculateScore } from '@/lib/utils/scoreCalculator'

// T05
test('Score de 7 retourne le profil : Exemplaire', () => {
  const answers = { 1: 3, 2: 2, 3: 2 }
  const { score, profil } = calculateScore(answers)
  expect(score).toBe(7)
  expect(profil).toBe('Exemplaire')
})

// T06
test('Score de 15 retourne le profil : Correct', () => {
  const answers = { 1: 5, 2: 5, 3: 5 }
  const { score, profil } = calculateScore(answers)
  expect(score).toBe(15)
  expect(profil).toBe('Correct')
})

// T07
test('Score de 22 retourne le profil: À améliorer', () => {
  const answers = { 1: 8, 2: 7, 3: 7 }
  const { score, profil } = calculateScore(answers)
  expect(score).toBe(22)
  expect(profil).toBe('À améliorer')
})

// T08
test('Score de 23 retourne le profil : Problématique', () => {
  const answers = { 1: 8, 2: 8, 3: 7 }
  const { score, profil } = calculateScore(answers)
  expect(score).toBe(23)
  expect(profil).toBe('Problématique')
})

// T09
test('Le score est égal à la somme des réponses', () => {
  const answers = { 1: 3, 2: 4, 3: 5 }
  const { score } = calculateScore(answers)
  expect(score).toBe(12)
})