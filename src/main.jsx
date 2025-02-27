import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextApi>
    <BrowserRouter  basename={process.env.PUBLIC_URL}>
    <App />
    </BrowserRouter>
    </ContextApi>
  </React.StrictMode>,
)
