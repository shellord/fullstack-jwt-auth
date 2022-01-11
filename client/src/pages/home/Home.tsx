import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const { isLoggedin, loading } = useAuth()
  const navigate = useNavigate()
  const [showloading, sethowloading] = useState(true)

  useEffect(() => {
    sethowloading(loading)
    if (!loading && !isLoggedin) {
      navigate('/login')
    }
  }, [isLoggedin, loading, navigate])

  if (showloading) {
    return <div>Loading</div>
  }
  return (
    <Layout>
      <div className={styles.container}>
        <p>Hello World</p>
      </div>
    </Layout>
  )
}

export default Home
