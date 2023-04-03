import React from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Register from '../users/Register';
import Login from '../users/Login';
import Main from '../users/Main';
function Routers() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/main' element={<Main />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routers