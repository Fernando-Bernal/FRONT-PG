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
import ProtectedAdmin from './components/admin/ProtectedAdmin'
import PageNotFound from './components/PageNotFound';
import Admin from './components/admin/Admin';
import Orders from './components/admin/Orders';
import CreateShoes from './components/admin/CreateShoes';
import CreateBrand from './components/admin/CreateBrand';
import Forget from './components/Forget';
import ModifShoe from './components/admin/ModifShoe';
import OnSale from './components/OnSale';
import Favorites from './components/Favorites'
import CreateSize from './components/admin/CreateSize';
import Order from './components/Order'

export function App() {
  
  return (

    <div className='font-monserrat'>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/order/:idPayment" element={<Order />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/sale" element={<OnSale />} />
          <Route exact path="/products" element={<Catalog />} />
          <Route exact path="/products/:id" element={<CardDetail/>} />
          <Route exact path="/signin" element={<Signin/>} />
          <Route exact path="/createaccount" element={<CreateAccount/>} />
          <Route exact path='/account' element={<Protected><Account/></Protected>} />
          <Route exact path= "/admin" element={<ProtectedAdmin><Admin/></ProtectedAdmin>} />
          <Route exact path= "/orders" element={<ProtectedAdmin><Orders/></ProtectedAdmin>} />
          <Route exact path= "/createshoes" element={<ProtectedAdmin><CreateShoes/></ProtectedAdmin>} />
          <Route exact path= "/createbrand" element={<ProtectedAdmin><CreateBrand/></ProtectedAdmin>} />
          <Route exact path= "/createsize" element={<ProtectedAdmin><CreateSize/></ProtectedAdmin>} />
          <Route exact path= "/modifshoe" element={<ProtectedAdmin><ModifShoe/></ProtectedAdmin>} />
          <Route exact path="/colletions/:brand" element={<CatalogBrand/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path= "/aboutUs" element={<AboutUs/>} />
          <Route exact path= "/contactUs" element={<ContactUs/>} />
          <Route exact path= "/sizeChart" element={<SizeChart/>} />
          <Route exact path= "/termsOfService" element={<TermsOfService/>} />
          <Route exact path= "/forget" element={<Forget/>} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
    
  );
}

export default App