import React from 'react';
import { Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Customer from './pages/Customers/Customer';
import AddCustomer from './pages/Customers/AddCustomer';
import EditCustomer from './pages/Customers/EditCustomer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Customer />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/edit-customer/:id" element={<EditCustomer />} />
      </Routes>
    </div>
  );
}

export default App;
