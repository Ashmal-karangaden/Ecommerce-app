import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

export const Spinner = ({path ='login'}) => {
    const [ count, setCount ] = useState(5)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const intreval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate(`/${path}`,{
            state:location.pathname        
        })
        return () => { clearInterval(intreval) }
    }, [count, navigate,location,path])
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>

                <h1>Redirecting you in {count} second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading....</span>
                </div>
            </div>
        </>
    )
}
