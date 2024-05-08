import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { TooltipProvider } from './components/ui/tooltip.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
