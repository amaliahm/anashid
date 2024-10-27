import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

//COMPONENTS
import App from './App.jsx'
import anasheedStore from './store/store.js';
import ErrorBoundary from './pages/errorBoundary/ErrorBoundary.jsx';

//STYLES
import './style/index.css'

// PROVIDER
import { AdminProvider } from './hooks/adminContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={anasheedStore}>
    <StrictMode>
      <AdminProvider >
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AdminProvider>
    </StrictMode>
  </Provider>
)
