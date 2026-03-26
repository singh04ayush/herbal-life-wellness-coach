import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HerbalProvider } from './context/HerbalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HerbalProvider>
      <App />
    </HerbalProvider>
  </React.StrictMode>,
)
