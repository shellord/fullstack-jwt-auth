import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default Layout
