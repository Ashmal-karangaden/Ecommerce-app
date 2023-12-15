import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <Layout title={'Go back - page not found'}>
       <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h1 className='pnf-heading'>Oops ! Page Not Found</h1>
        <Link to='/' className='pnf-btn'>
          Go Back
        </Link>
       </div>
     
    </Layout>
  )
}

export default PageNotFound