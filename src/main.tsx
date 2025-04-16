import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/font-reset.css'
import './styles/fonts.css'
import './styles/globals.css'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
