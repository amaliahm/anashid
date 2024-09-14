import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing page/LandingPage'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/home/home';
import VerifyEmail from './pages/auth/VerifyEmail';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path="/auth/verify-email/:email" element={<VerifyEmail />} />
          <Route path='/user/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
