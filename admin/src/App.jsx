import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "./pages/auth/Login"
import PrivateRoute from './pages/auth/PrivateRoute';
import useAuthInit from './pages/auth/AuthInit';
import ForgetPassword from './pages/auth/ForgetPassword';
import ChangePassword from './pages/auth/ChangePassword';
import Home from './pages/home/Home';
import Users from './pages/home/Users';
import Anasheed from './pages/home/Anasheed';
import Artists from './pages/home/Artists';
import Categories from './pages/home/Categories';
import Trash from './pages/home/Trash';
import { Navigate } from 'react-router-dom';
import AddCategory from './pages/add/AddCategory';
import AddArtist from './pages/add/AddArtist';

function App() {
  useAuthInit()

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={<Navigate to='/auth/login' />} 
          />
          <Route 
            path='/auth/login' 
            element={<Login />} 
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
            path='/admin/home/:id' 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/users/:id' 
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/anasheed/:id' 
            element={
              <PrivateRoute>
                <Anasheed />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/artists/:id' 
            element={
              <PrivateRoute>
                <Artists />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/artists/add/:id' 
            element={
              <PrivateRoute>
                <AddArtist />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/categories/:id' 
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/categories/add/:id' 
            element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/admin/trash/:id' 
            element={
              <PrivateRoute>
                <Trash />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
