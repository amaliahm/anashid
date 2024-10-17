import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

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
import NowPlayingWrapper from './Components/NowPlayingWrapper';

import Favorites from './pages/Favorites';

import Playlists from './pages/Playlists';
import AddPlaylist from './pages/add/AddPlaylist';
import Playlist from './pages/details/Playlist';

import Profile from './pages/Profile';

import Contact from './pages/Contact';

//SIDEBAR
import SideBarMobile from './Components/SideBarMobile';
import Sidebar from './Components/SideBar';

const AppLayout = () => {
  
  const getActiveElement = () => {
    const location = useLocation();
    const { pathname } = location
    const idPattern = /^\/user\/[a-zA-Z-]+\/\d+$/; // Pattern for dynamic routes
    switch (true) {
      case pathname.startsWith('/user/home/'):
        return 1;
      case pathname.startsWith('/user/categories'):
        return 2;
      case pathname.startsWith('/user/artists'):
        return 3;
      case pathname.startsWith('/user/playednow'):
        return 4;
      case pathname.startsWith('/user/history'):
        return 5;
      case pathname.startsWith('/user/favorites'):
        return 6;
      case pathname.startsWith('/user/playlists'):
        return 7;
      case pathname.startsWith('/user/add-playlist'):
        return 8;
      case pathname.startsWith('/user/contact'):
        return 9;
      case pathname.startsWith('/user/profile'):
        return 10;
      default:
        return null;
    }
  };
  
  const activeElement = getActiveElement();
  const activeSong = { title: 'Sample Song' };

  return (
    <div className="flex h-screen m-0 p-0 bg-[#2D2635]">
      <div className='hidden lg:block w-64 text-white ml-64'>
        <Sidebar elem={activeElement} />
      </div>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-full relative lg:w-[calc(100vw-256px)]">
          <div className="flex-grow w-full lg:w-[calc(100%-230px)] sm:w-full overflow-y-auto">
            <div className='p-4 pr-8 w-full overflow-y-auto'>
              <div className='flex mb-8 gap-6 items-center'>
                <SideBarMobile elem={activeElement}/>
              </div>
              <Routes>

                {/* home */}
                <Route 
                  path='/user/home/:id' 
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  } 
                />
      
                {/* anasheed */}
                <Route 
                  path='/user/playednow/:id' 
                  element={
                    <PrivateRoute>
                      <PlayedNow />
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
      
                {/* categories */}
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
      
                {/* artists */}
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
      
                {/* playlists */}
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
                  path='/user/playlists/playlist/:id' 
                  element={
                    <PrivateRoute>
                      <Playlist />
                    </PrivateRoute>
                  } 
                />
      
                {/* settings */}
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
      
                {/* else */}
                <Route 
                  path='*' 
                  element={
                    <ErrorPage />
                  } 
                />
              </Routes>
            </div>
          </div>
          {activeSong?.title && (
            <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
              {/* <MusicPlayer /> */}
              <NowPlayingWrapper />
            </div>
          )}
          {/* w-full lg:w-[230px] fixed bottom-0 lg:relative lg:bottom-auto */}
        </div>
      </div>
    </div>
  );
}

function App() {
  useAuthInit()

  return (
    <>
      <Router>
        <Routes>

          {/* auth */}
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
          {/* private route */}
          <Route 
            path='*' 
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            } 
          />
          {/* else */}
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