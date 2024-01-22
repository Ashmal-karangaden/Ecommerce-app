import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'


function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')

    const handleEmail = (e) => setEmail(e.target.value)
    const handleAnswer = (e) => setAnswer(e.target.value)
    const handleNewPassword = (e) => setNewPassword(e.target.value)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, answer, newPassword})
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
                console.log(res.data)
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
                    <h4 className='title'>Reset Password</h4>
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
                            type="question"
                            value={answer}
                            onChange={handleAnswer}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='Enter your favorite sports'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="password"
                            value={newPassword}
                            onChange={handleNewPassword}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter your Password'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        RESET PASSWORD
                    </button>
                </form>

            </div>
        </Layout>
    )
    return content
}

export default ForgotPassword