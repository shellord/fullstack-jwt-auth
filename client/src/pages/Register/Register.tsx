import React from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './Register.module.css'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../../contexts/AuthContext'

const Register = () => {
  const { accessToken, changeAccessToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { username, email, password } = e.target as typeof e.target & {
      username: { value: string }
      email: { value: string }
      password: { value: string }
    }
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', {
        username: username.value,
        email: email.value,
        password: password.value,
      })
      if (response.status === 200) {
        console.log(response.data.accessToken)
        console.log(response.data.refreshToken)
      }
    } catch (e) {
      const err = e as AxiosError
      alert(err.response?.data.error)
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
            <input type='submit' className={styles.button} value='Log in' />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
