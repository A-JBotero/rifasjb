import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  //Render on strict mode app an the navegation whit react router dom
  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    
    
  </StrictMode>,
)
