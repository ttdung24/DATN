import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import Header from './sections/Header';
import Footer from './sections/Footer';
import AddProduct from './sections/shop/AddProduct';
import ProductCategory from './pages/ProductCategory';
import Product from './pages/Product';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SearchPage from './pages/SearchPage';
import OrderPage from './pages/OrderPage';
import OrderDesPage from './pages/OrderDesPage';
import EditProduct from './sections/shop/EditProduct';
import ShopOrders from './sections/shop/ShopOrders';
import ShopStatistics from './sections/shop/ShopStatistics';
import UserPage from './pages/UserPage';
import ChangePassword from './sections/userpage/ChangePassword';
import QRCodePage from './pages/QRCodePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route
            path='/homepage'
            element={
              <>
                <Header />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop'
            element={
              <>
                <Header />
                <Shop />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop/orders'
            element={
              <>
                <Header />
                <ShopOrders />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop/statistics'
            element={
              <>
                <Header />
                <ShopStatistics />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop/add'
            element={
              <>
                <Header />
                <AddProduct />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop/edit/:id'
            element={
              <>
                <Header />
                <EditProduct />
                <Footer />
              </>
            }
          />
          <Route
            path='/category/:slug'
            element={
              <>
                <Header />
                <ProductCategory />
                <Footer />
              </>
            }
          />
          <Route
            path='/product/:id'
            element={
              <>
                <Header />
                <Product />
                <Footer />
              </>
            }
          />
          <Route
            path='/search'
            element={
              <>
                <Header />
                <SearchPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/cart'
            element={
              <>
                <Header />
                <CartPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/payment'
            element={
              <>
                <Header />
                <PaymentPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/payment/:id'
            element={
              <>
                <Header />
                <QRCodePage />
                <Footer />
              </>
            }
          />
          <Route
            path='/orders'
            element={
              <>
                <Header />
                <OrderPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/orders/:id'
            element={
              <>
                <Header />
                <OrderDesPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/user'
            element={
              <>
                <Header />
                <UserPage />
                <Footer />
              </>
            }
          />
          <Route
            path='/user/password'
            element={
              <>
                <Header />
                <ChangePassword />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
