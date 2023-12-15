import React from 'react'
import Layout from '../components/Layout/Layout.js'

function About() {
  return (
    <Layout title={'About us - Ecommerce App'}>
        <div className='row about'>
        <div className='col-md-6'>
          <img src='/image/about.jpg'
            alt='about us'
            style={{ width: '90%' }} />

        </div>
        <div className='col-md-4'>
          <p className='mb-5 fs-5'>
            Lorem ipsum dolor sit amet, consectetur
            <br/>
            adipiscing elit, sed do eiusmod tempor
            <br/>enim ad minim veniam, quis nostrud
            <br/>incididunt ut labore et dolore magna aliqua. Ut
            <br/>exercitation ullamco laboris nisi ut aliquip ex
            <br/>ea commodo consequat. Duis aute irure dolor
            <br/>in reprehenderit in voluptate velit esse cillum
            </p>
        </div>
        </div>
        
    </Layout>
  )
}

export default About