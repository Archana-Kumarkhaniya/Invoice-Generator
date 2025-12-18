import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Invoice from './Invoice';
import Print from './Print';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Invoice/>} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
