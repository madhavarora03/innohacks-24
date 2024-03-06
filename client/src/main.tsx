import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { store } from './lib/store.ts'
import CartPage from './routes/Cart/index.tsx'
import HomeScreen from './routes/HomeScreen/index.tsx'
import LoginPage from './routes/Login/index.tsx'
import ProductScreen from './routes/ProductScreen/index.tsx'
import SearchPage from './routes/SearchPage/index.tsx'
import SigninPage from './routes/SigninPage/index.tsx'

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />

    {/* Auth */}
    <Route path='/login' element={<LoginPage />} />
    <Route path='/signup' element={<SigninPage />} />

    {/* Product Routes */}
    <Route path='/product' element={<ProductScreen />} />
    <Route path='/product/:id' element={<ProductScreen />} />

    {/* Search Bar */}
    <Route path='/search' element={<SearchPage />} />
    <Route path='/search/:keyword' element={<SearchPage />} />

    <Route path='/cart' element={<CartPage />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
