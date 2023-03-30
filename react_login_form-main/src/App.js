import React from 'react';
import { Route,Routes } from 'react-router-dom';
import {Home} from './components/pages/Home/Home'
import { Register_pages } from './components/pages/Register/Register_pages';
import { Login_pages } from './components/pages/Login/Login_pages';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/login' element= {<Login_pages/>}/>
        <Route path='/register' element= {<Register_pages/>}/>
      </Routes>
    </div>
  );
}

export default App;