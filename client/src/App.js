import React from "react"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"
import Loan from "./components/Loan"
import Deposit from "./components/Deposit"
import TransactionHistory from "./components/TransactionHistory"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProfileNew from "./components/ProfileNew"
import Transfer from "./components/Transfer"
import FD from "./components/FD"
import Success from "./components/Success"
import Failure from "./components/Failure"



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/profile' element={<ProfileNew />}/>
        <Route exact path='/loan' element={<Loan />}/>
        <Route exact path='/transfer' element={<Transfer/>}/>
        <Route exact path='/transactions' element={<TransactionHistory />}/>
        <Route exact path='/fixeddeposit' element={<FD />}/>
        <Route exact path='/deposit' element={<Deposit />}/>
        <Route exact path='/confirmation' element={<Success />}/>
        <Route exact path='/failed' element={<Failure />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
