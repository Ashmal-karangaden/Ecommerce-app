import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const location = useLocation()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }

        } catch (err) {
            console.log(err)
            toast.error('Somthing Went Wrong')
        }
    }
    const content = (
        <Layout title={"Register Ecommerce app"}>
            <div className='form-container'>

                <form className='mt-4' onSubmit={handleSubmit} >
                    <h4 className='title'>LOGIN FORM</h4>
                    <div className="mb-3">

                        <input
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter your Email'
                            required
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
                    <div className='mb-3'>
                        <button
                            type='button'
                            className="btn btn-primary"
                            onClick={() => { 
                                navigate('/forgot-password')
                            }}
                        >
                            Forgot Password
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        LOGIN
                    </button>
                </form>

            </div>
        </Layout>
    )
    return content
}

export default Login