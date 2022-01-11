import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/Register/Register'
import Protected from './pages/Protected/Protected'
import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/protected' element={<Protected />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
