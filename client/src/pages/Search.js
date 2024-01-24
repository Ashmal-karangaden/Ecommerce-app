import React, { useState } from 'react'
import Layout from '../components/Layout/Layout.js'
import { useSearch } from '../context/Search.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Search = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const [cart,setCart] = useState([])
    console.log(values)
    const content = (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    
                    <h1 className="text-center">All Product</h1>
                    <div className="d-flex flex-wrap">
                        {values.results?.map((p) => (
                            <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={'250px'} alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 65)}...</p>
                                    <p className="card-text"> ${p.price}</p>
                                    <button className='btn btn-primary me-2' onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                    <button className=' btn btn-secondary ' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Item Added To Cart') }}
                                    >ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
    return content
}

export default Search