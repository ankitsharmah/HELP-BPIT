import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import './app.css'
import { Provider } from 'react-redux'

import store from './redux/store.js'
import SearchSuggestions from './components/SearchSuggestion.jsx'
import Header from './shared/Header.jsx'
import { BrowserRouter } from 'react-router-dom'
// export const BASE_URL="http://localhost:9191"
export const BASE_URL="https://help-bipit-api.onrender.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <BrowserRouter>

      <div className="relative max-w-7xl mx-auto">
          <Header />
          <div className="overflow-hidden h-fit">
              <App />
          </div>
      </div>
      </BrowserRouter>

  </Provider>
</StrictMode>
)
