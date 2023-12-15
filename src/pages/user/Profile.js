import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

function Profile() {
  return (
    <Layout title={'Your Profile '}>
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
            <div className=''>
              <h3>Your Profile</h3>
            </div>
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default Profile