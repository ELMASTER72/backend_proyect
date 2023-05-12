import React from 'react'
import { Link } from 'react-router-dom'
import { Cards } from './Cards'

export const Main = () => {
  return (
    <div className='mains-store'>
        <div className='categorys'>
            <Link className='link'>Accesorios</Link>
            <Link className='link'>Energizantes</Link>
            <Link className='link'>Ropa</Link>
        </div>
        <div className='store-cards'>
          <div className='cards'>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
          </div>
          <div className='cards'>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
          </div>
        </div>
    </div>
  )
}
