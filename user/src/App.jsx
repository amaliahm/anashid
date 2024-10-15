import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// SEC STUFF
import PrivateRoute from './pages/auth/PrivateRoute';
import useAuthInit from './pages/auth/AuthInit';

//PAGES
import LandingPage from './pages/LandingPage'

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgetPassword from './pages/auth/ForgetPassword';
import ChangePassword from './pages/auth/ChangePassword';

import Home from './pages/Home';

import ErrorPage from './pages/error/ErrorPage';

import PlayedNow from './pages/details/PlayedNow';

import Categories from './pages/Categories';
import Category from './pages/details/Category';

import Artists from './pages/Artists';
import Artist from './pages/details/Artist';

import RecentlyPlayed from './pages/RecentlyPlayed';

import Favorites from './pages/Favorites';

import Playlists from './pages/Playlists';
import AddPlaylist from './pages/add/AddPlaylist';

import Profile from './pages/Profile';

import Contact from './pages/Contact';

function App() {
  useAuthInit()

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
            path='/user/categories/:id' 
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/categories/category/:id' 
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/artists/:id' 
            element={
              <PrivateRoute>
                <Artists />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/artists/artist/:id' 
            element={
              <PrivateRoute>
                <Artist />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/history/:id' 
            element={
              <PrivateRoute>
                <RecentlyPlayed />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/favorites/:id' 
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/playlists/:id' 
            element={
              <PrivateRoute>
                <Playlists />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/add-playlist/:id' 
            element={
              <PrivateRoute>
                <AddPlaylist />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/profile/:id' 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/user/contact/:id' 
            element={
              <PrivateRoute>
                <Contact />
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
