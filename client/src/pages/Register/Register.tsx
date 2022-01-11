import React from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './Register.module.css'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = e.target as typeof e.target & {
      username: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const username = formData.username.value
    const email = formData.email.value
    const password = formData.password.value
    try {
      const response = await register({ username, email, password })
      if (response) {
        navigate('/')
      }
    } catch (e) {
      alert(e)
    }
  }
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.header}>Register</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' />
            </div>
            <input type='submit' className={styles.button} value='Register' />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
