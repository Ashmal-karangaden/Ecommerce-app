import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function CategoryProduct() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const slug = params.slug

    const productCategory = async (e) => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${slug}`)
            setCategory(data?.category)
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        productCategory()
    }, [])

    return (
        <Layout>
            <div className='container'>
                <h1 className='text-center'>Category - {category?.name}</h1>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={'250px'} alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 65)}...</p>
                                        <p className="card-text"> $ {p.price}</p>
                                        <button className='btn btn-primary me-2' onClick={() => navigate(`product/${p.slug}`)}>More details</button>
                                        <button className=' btn btn-secondary ' >ADD TO CART</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct 