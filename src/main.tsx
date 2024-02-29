import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { ThemeConfig } from './config/theme.config'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ThemeConfig>
       <App />
    </ThemeConfig>
  </React.StrictMode>,
)
