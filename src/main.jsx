import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import { UserProvider } from './Context/ContextApi.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider >
    <StrictMode>
        <ToastContainer />
        <App />
    </StrictMode>,
  </UserProvider>
)
