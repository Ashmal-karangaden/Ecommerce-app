import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

function Orders() {
  return (
    <Layout title={'Your Orders'}>
    <div className='container-fluid m-3 p-3'>
     <div className='row'>
       <div className='col-md-3'>
         <UserMenu/>
       </div>
       <div className='col-md-9'>
         <div className=''>
           <h3>All Orders</h3>
         </div>
       </div>
     </div>
    </div>
 </Layout>
  )
}

export default Orders