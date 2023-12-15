import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

function PrivacyPolicy() {
  return (
    <Layout title={'Privacy Policy'}>
      <div className='row privacypolicy'>
        <div className='col-md-6'>
          <img src='/image/contactus.jpg'
            alt='contactus'
            style={{ width: '90%' }} />

        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about product free to call anytime wo 24X7 vailable
          </p>
          <p className='mt-3'><BiMailSend /> : ww.help@ecommerce.app</p>
          <p className='mt-3'>
            <BiPhoneCall /> : 023-342342434
          </p>
          <p className='mt-3'><BiSupport /> : 1800-0000-0000</p>
        </div>

      </div>
    </Layout>
  )
}

export default PrivacyPolicy