import React from 'react'
import { Button } from '../../ui/button/Button'

export const Main = () => {
  return (
    <div className='div-gym'>
        <div className='gymq'>
        <h1>GYM <br></br>
            <font color='#ECF936'>QU</font>
        </h1>
    </div>
    <div className='gym'>
        <h1>PRE - WORKOUT</h1>
        <hr color='#ECF936'></hr>
        <h1 className='h1'>EXERCISE<br></br>PHYSICAL</h1>
        <Button/>
    </div>
    </div>
  )
}
