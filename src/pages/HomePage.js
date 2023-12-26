import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Routes/Prices.js';
import { useCart } from '../context/cart.js';

function HomePage() {
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getTotal = async (e) => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
      toast.error('somthing went wrong')
    }
  }
  const getAllCategory = async (e) => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data?.success) {
        setCategories(data?.category)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.message)
    }
  }
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error('Something Went Wrong');
    }
  }
  const loadMore = async (e) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    if (page === 1) return;
    loadMore()
  }, [page])

  useEffect(() => {
    getAllCategory();
  }, [])
  useEffect(() => {
    getTotal()
  }, [])

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  const filterProduct = async (e) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked, radio
      })
      setLoading(false)
      setProducts(data?.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Somthing Went Wrong')
    }

  }
  const handlFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  return (
    <Layout title={'All product - Best offers'}>
      <div className="row mt-3" style={{ marginRight: '0' }}>
        <div className="col-md-2 border-end border-dark">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column m-3">
            {categories?.map((c) => (
              <Checkbox key={c._id}
                onChange={(e) => handlFilter(e.target.checked, c._id)}
                name='checkBox'
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center m-4">Price Filter</h6>
          <div className="d-flex flex-column m-3">
            <Radio.Group onChange={e => setRadio(e.target.value)} name='Radio'>
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column m-3">
            <button className='btn btn-danger mt-2' onClick={() => window.location.reload()}> Reset Filter</button>
          </div>
        </div>
        <div className="col-md-9">

          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-3" style={{ width: '18rem' }} key={p._id}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={'250px'} alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 65)}...</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className='btn btn-primary me-2' onClick={() => navigate(`product/${p.slug}`)}>More details</button>
                  <button className=' btn btn-secondary ' onClick={() =>{setCart([...cart,p]); localStorage.setItem('cart',JSON.stringify([...cart,p])); toast.success('Item Added To Cart')}}
                  >ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning '
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                {loading ? "loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage