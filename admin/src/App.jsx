import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/auth/Login"
import PrivateRoute from './pages/auth/PrivateRoute';
import Home from './pages/home/Home';
import useAuthInit from './pages/auth/AuthInit';
import ForgetPassword from './pages/auth/ForgetPassword';

function App() {
  useAuthInit()

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route 
            path='/admin/home/:id' 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
