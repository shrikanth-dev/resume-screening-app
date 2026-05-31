import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ResultsProvider } from './context/ResultsContext.jsx'
import App from './App.jsx'

import "./styles/global.css";
import "./styles/responsive.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </StrictMode>,
)
