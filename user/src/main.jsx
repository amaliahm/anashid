import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

//PAGES
import App from './App.jsx'

//STORE
import anasheedStore from './store/store.js'

//STYLES
import './styles/index.css'

//ERROR BOUNDARY
import ErrorBoundary from './pages/error/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <Provider store={anasheedStore} >
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </Provider>
)
