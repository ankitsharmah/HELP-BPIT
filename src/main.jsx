import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

import store from './redux/store.js'
import SearchSuggestions from './components/SearchSuggestion.jsx'
// export const BASE_URL="http://localhost:9191"
export const BASE_URL="https://help-bipit-api.onrender.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <div  className=" relative  md:min-h-screen h-fit max-w-7xl mx-auto">

        <App />
      </div>
  
    </Provider>
  </StrictMode>,
)
