export interface PasswordValidationResult {
  isValid: boolean
  message: string
  strength: 'weak' | 'medium' | 'strong'
  checks: {
    hasMinLength: boolean
    hasUppercase: boolean
    hasLowercase: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
  }
}
