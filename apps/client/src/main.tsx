import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './index.css'
import App from './App'
const container = document.getElementById('root')

const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
  
)
