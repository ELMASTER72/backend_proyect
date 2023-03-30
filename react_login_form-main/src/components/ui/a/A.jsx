import React from 'react'
import { Logo } from '../logo/Logo'

export const A = () => {
  return (
    <div className='navar'>
      <div className='links'>
          <a href="/">HOME</a>
          <a href="--">ROUTINES</a>
          <a href="/login">LOGIN</a>
          <a href="/register">REGISTER</a>
          <div className='gym-logo'>
            <Logo/>
          </div>
        </div>
    </div>
        
  )
}

