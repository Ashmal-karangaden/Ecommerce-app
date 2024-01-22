import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/Layout/UserMenu'

function Dashboard() {
  const [auth] = useAuth()
    const content =(
    <Layout title={'Dashbord- Ecommers-app'}>
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-9'>
            <div className='card w-75 m-3'>
              <h3>User Name: {auth?.user?.name}</h3>
              <h3>User Email: {auth?.user?.email}</h3>
              <h3>User Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
       </div>
    </Layout>
    )
  return content
}

export default Dashboard