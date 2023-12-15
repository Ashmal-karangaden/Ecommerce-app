import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../../styles/AuthStyles.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmial] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmial(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handlePhone = (e) => setPhone(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)
    const handleAnswer = (e) => setAnswer(e.target.value)
    // form function //
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name, email, password, phone, address, answer
            }
            );
            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
           
            
        } catch (err) {
            console.log(err)
            toast.error('Somthing went wrong')
        }
       
    }

    const content = (
        <Layout title={"Register Ecommerce app"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit} >
                <h4 className='title'>REGISTER FORM</h4>
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
                    <div className="mb-3">

                        <input
                            type="question"
                            value={answer}
                            onChange={handleAnswer}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='What is your favorite sports'
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        REGISTER
                    </button>
                </form>

            </div>
        </Layout>
    )
    return content
}

export default Register