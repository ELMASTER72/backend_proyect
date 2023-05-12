import React from 'react';
import { Route,Routes } from 'react-router-dom';
import {Home} from './components/pages/Home/Home'
import { Store } from './components/pages/Home/Store';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/Store' element = {<Store/>}/>
      </Routes>
    </div>
  );
}

export default App;