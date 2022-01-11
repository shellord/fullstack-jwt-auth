import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Auth Client</p>
      <nav className={styles.nav}>
        <NavLink to='/login' className={styles.navItem}>
          Login
        </NavLink>
        <NavLink to='/register' className={styles.navItem}>
          Register
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
