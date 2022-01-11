import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Navbar: React.FC = () => {
  const { isLoggedin, logout } = useAuth()
  if (!isLoggedin) {
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
  return (
    <div className={styles.container}>
      <p className={styles.header}>Auth Client</p>
      <nav className={styles.nav}>
        <NavLink to='/protected' className={styles.navItem}>
          Protected
        </NavLink>
        <NavLink to='/' className={styles.navItem} onClick={() => logout()}>
          Logout
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
