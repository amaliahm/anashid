import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import VerifyEmail from './pages/auth/VerifyEmail';
import PrivateRoute from './pages/auth/PrivateRoute';
import ForgetPassword from './pages/auth/ForgetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import ErrorPage from './pages/error/ErrorPage';
import PlayedNow from './pages/PlayedNow';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={<LandingPage />} 
          />
          <Route 
            path='/auth/signup' 
            element={<Signup />} 
          />
          <Route 
            path='/auth/login' 
            element={<Login />} 
          />
          <Route 
            path="/auth/verify-email/:email" 
            element={<VerifyEmail />} 
          />
          <Route 
            path='/auth/forget-password' 
            element={<ForgetPassword />} 
          /> 
          <Route 
            path='/auth/reset-password/:token' 
            element={<ChangePassword />} 
          />
          <Route 
            path='/user/home/:id' 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/playednow/:id' 
            element={
              <PrivateRoute>
                <PlayedNow />
              </PrivateRoute>
            } 
          />
          <Route 
            path='*' 
            element={
              <ErrorPage />
            } 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
