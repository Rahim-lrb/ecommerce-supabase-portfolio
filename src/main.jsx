import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { WishlistProvider } from './contexts/wishlistContext.jsx'
import { CartProvider } from "./contexts/cartContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthContextProvider>
  </StrictMode>,
)
