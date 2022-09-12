import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Catalog from './components/Catalog';
import CardDetail from './components/CardDetail';
import CreateAccount from './components/CreateAccount';
import Account from './components/Account'
import Signin from './components/Signin'
import CatalogBrand from './components/CatalogBrand';
import Cart from './components/Cart';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SizeChart from './components/SizeChart';
import TermsOfService from './components/TermsOfService';
import AuthContextProvider from './context/AuthContext';
import Protected from './components/Protected'
import PageNotFound from './components/PageNotFound';

export function App() {
  
  return (

    <div className='font-monserrat'>
      <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Catalog />} />
        <Route exact path="/products/:id" element={<CardDetail/>} />
        <Route exact path="/signin" element={<Signin/>} />
        <Route exact path="/createaccount" element={<CreateAccount/>} />
        <Route exact path='/account' element={<Protected><Account/></Protected>} />
        <Route exact path="/colletions/:brand" element={<CatalogBrand/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path= "/aboutUs" element={<AboutUs/>} />
        <Route exact path= "/contactUs" element={<ContactUs/>} />
        <Route exact path= "/sizeChart" element={<SizeChart/>} />
        <Route exact path= "/termsOfService" element={<TermsOfService/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </AuthContextProvider>
    </div>
    
  );
}

export default App