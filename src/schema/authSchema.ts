import * as yup from 'yup'

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).min(30).required(),
})

export { registerSchema }
