import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import styles from './Protected.module.css'
import axios from 'axios'

const Protected = () => {
  const { isLoggedin, loading, accessToken } = useAuth()
  const [data, setData] = useState<any>()

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isLoggedin) {
      navigate('/login')
    }
    async function getData() {
      const response = await axios.post(
        'http://localhost:4000/protected/data',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setData(response.data)
    }
    if (!loading && isLoggedin) {
      getData()
    }
  }, [navigate, isLoggedin, accessToken, loading])

  if (loading || data === undefined) {
    return <div>Loading</div>
  }

  return (
    <Layout>
      <div className={styles.container}>
        <p>id: {data?.user.id}</p>
        <p>username: {data?.user.username}</p>
        <p>email: {data?.user.email}</p>
      </div>
    </Layout>
  )
}

export default Protected
