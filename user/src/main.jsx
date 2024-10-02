import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { authStore } from './redux/auth/authStore.js'
import { Provider } from 'react-redux'
import './index.css'
import ErrorBoundary from './pages/error/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <Provider store={authStore} >
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </Provider>
)
