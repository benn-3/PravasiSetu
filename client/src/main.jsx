import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'; // Import i18n config
import './index.css'
import App from './App.jsx'
import { store } from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
