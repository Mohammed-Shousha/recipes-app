import { object, string, number, ref } from 'yup'

import { passwordRegex } from '@utils/database'

const requiredString = string().required('Required')
const requiredNumber = number().required('Required')
const requiredStringMin2 = requiredString.min(2, 'Too Short')

const email = requiredString.trim().email('Wrong Email')

const password = requiredString.matches(
  passwordRegex,
  'Password must contain at least one letter, at least one number, and be longer than 8 charaters'
)

const confirmPassword = (passwordRef) =>
  requiredString.oneOf([ref(passwordRef), null], 'Passwords must match')

export const signInSchema = object({
  email,
  password: requiredString,
})

export const registerSchema = object({
  name: requiredStringMin2,
  email,
  password,
  confirmPassword: confirmPassword('password'),
})

export const changePasswordSchema = object({
  password: requiredString,
  newPassword: password,
  confirmPassword: confirmPassword('newPassword'),
})

export const recipeFormSchema = object({
  title: requiredStringMin2,
  time: requiredNumber,
  ingredients: requiredString,
  directions: requiredString,
})

export const editProfileSchema = object({
  name: requiredStringMin2,
})
