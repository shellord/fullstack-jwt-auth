import React from 'react'
import styles from './Home.module.css'
import Layout from '../../components/Layout/Layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <p>Hello World</p>
      </div>
    </Layout>
  )
}

export default Home
