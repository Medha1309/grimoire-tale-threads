import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Load archive test utilities (available in browser console)
import './utils/testArchive'

// Initialize dynamic favicon
import { initDynamicFavicon } from './utils/dynamicFavicon'
initDynamicFavicon()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)