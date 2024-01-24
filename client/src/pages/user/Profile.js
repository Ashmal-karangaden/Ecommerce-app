import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

function Profile() {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const navigate = useNavigate()

  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handlePhone = (e) => setPhone(e.target.value)
  const handleAddress = (e) => setAddress(e.target.value)

useEffect(()=>{
  const {name,email,phone,address,password} = auth.user
  setName(name)
  setEmail(email)
  setPhone(phone)
  setAddress(address)
  setPassword(password)
},[auth.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put('/api/v1/auth/profile', {
        name,
         email,
          password,
           phone,
            address
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.user.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success('Profile Updated Successfully')
      }
    } catch (err) {
      console.log(err)
      toast.error('Somthing went wrong')
    }
  }

  return (
    <Layout title={'Your Profile '}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className=''>
              <div className='form-container'>
                <form onSubmit={handleSubmit} >
                  <h4 className='title'>PROFILE</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={handleName}
                      className="form-control"
                      id="exampleInputName"
                      placeholder='Enter Your Name'
                      required
                    />
                  </div>
                  <div className="mb-3">

                    <input
                      type="email"
                      value={email}
                      onChange={handleEmail}
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder='Enter your Email'
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">

                    <input
                      type="password"
                      value={password}
                      onChange={handlePassword}
                      className="form-control"
                      id="exampleInputPassword"
                      placeholder='Enter your Password'
                      required
                    />
                  </div>
                  <div className="mb-3">

                    <input
                      type="number"
                      value={phone}
                      onChange={handlePhone}
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder='Enter your Phone'
                      required
                    />
                  </div>
                  <div className="mb-3">

                    <input
                      type="address"
                      value={address}
                      onChange={handleAddress}
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder='Enter your Address'
                      required
                      
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >

                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default Profile