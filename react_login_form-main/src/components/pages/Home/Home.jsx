import React from 'react'
import '../../../App.css';
import { Header } from '../../layouts/Header/Header'
import { Main } from '../../layouts/Main/Main'

export const Home = () => {
  return (
    <body className='App'>
      <header>
        <Header/>
      </header>
      <main>
        <Main/>
      </main>
    </body>
  )
}
