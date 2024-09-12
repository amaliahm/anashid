import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing page/LandingPage'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
