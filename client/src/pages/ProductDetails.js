import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id,data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            console.log(data)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])
    const content = (
        <Layout>
            <div className="row container">
                <div className='col-md-1' style={{ marginLeft: '10px' }}>
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top hover-border" style={{ marginTop: '20px', width: '50px' }} height={'50px'} alt={product.name} />
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top hover-border" style={{ marginTop: '20px', width: '50px' }} height={'50px'} alt={product.name} />
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top hover-border" style={{ marginTop: '20px', width: '50px' }} height={'50px'} alt={product.name} />
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top hover-border" style={{ marginTop: '20px', width: '50px' }} height={'50px'} alt={product.name} />
                </div>
                <div className="col-md-5" style={{ marginLeft: '100px' }}>
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" style={{ marginTop: '20px', width: '350px' }} height={'350px'} alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h6 style={{ paddingLeft: '20px', marginTop: '10px' }}>Name : {product.name}</h6>
                    <h6 style={{ paddingLeft: '20px', marginTop: '10px' }}>Description : {product.description}</h6>
                    <h6 style={{ paddingLeft: '20px', marginTop: '10px' }}>Price : ${product.price}</h6>
                    <h6 style={{ paddingLeft: '20px', marginTop: '10px' }}>Category : {product.category?.name} </h6>
                    <button style={{ marginLeft: '20px', marginTop: '10px' }} className=' btn btn-secondary ' >ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="container">
          <h5 >Similar Product</h5>
          {relatedProducts.length < 1 && <p className='text-center bold'>Similar Product Not Available</p>}
          <div className="d-flex flex-wrap">
             {relatedProducts?.map( (p) => (
                <div className="card m-3" style={{ width: '18rem'}} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={'250px'} alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 65)}...</p>
                    <p className="card-text"> $ {p.price}</p>
                    <button className='btn btn-primary me-2' onClick={()=> navigate(`../product/${p.slug}`)}>More details</button>
                    <button className=' btn btn-secondary ' >ADD TO CART</button>
                  </div>
                </div>
            ))}
          </div>
          </div>

        </Layout>
    )

    return content
}

export default ProductDetails