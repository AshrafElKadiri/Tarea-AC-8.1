import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from "./redux/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Envuelve la app con el store */}
      <App />
    </Provider>
  </StrictMode>,
)

