import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <h1 className='text-center' style={{fontSize:'28px'}}>Alright Reserved &copy; ItStudio </h1>
      <p className='text-center mt-3'>
       <Link to='/about'>About</Link>
        | <Link to='/contact'>Contact</Link>
        | <Link to='/Privacy-Policy'>Privacy Policy</Link>
      </p>
      </div>
  )
}

export default Footer