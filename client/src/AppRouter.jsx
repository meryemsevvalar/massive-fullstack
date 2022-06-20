import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/routerstyle.css'

import Table from './Pages/Table';
import Pie from './Pages/Pie';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>

            <Route  path='/table' element={
                <Table />
            } />

            <Route  path='/pie' element={
                <Pie />
            } />

        </Routes>
            
    </BrowserRouter>
    
  )
}

export default AppRouter