export type ScoreProfile = 'Exemplaire' | 'Correct' | 'À améliorer' | 'Problématique'

export interface ScoreResult {
  score: number
  profil: ScoreProfile
  message: string
}

export function calculateScore(answers: Record<number, number>): ScoreResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0)

  let profil: ScoreProfile
  let message: string

  if (score <= 7) {
    profil = 'Exemplaire'
    message = 'Vos pratiques numériques sont très sobres ! Continuez ainsi.'
  } else if (score <= 15) {
    profil = 'Correct'
    message = 'Vous êtes sur la bonne voie, quelques améliorations possibles.'
  } else if (score <= 22) {
    profil = 'À améliorer'
    message = 'Votre empreinte numérique est moyenne, des efforts sont nécessaires.'
  } else {
    profil = 'Problématique'
    message = 'Votre empreinte numérique est élevée, agissez rapidement !'
  }

  return { score, profil, message }
}