import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div class='footer'>
      <h1 class='text-center' style={{fontSize:'28px'}}>Alright Reserved &copy; ItStudio </h1>
      <p class='text-center mt-3'>
       <Link to='/about'>About</Link>
        | <Link to='/contact'>Contact</Link>
        | <Link to='/Privacy-Policy'>Privacy Policy</Link>
      </p>
      </div>
  )
}

export default Footer