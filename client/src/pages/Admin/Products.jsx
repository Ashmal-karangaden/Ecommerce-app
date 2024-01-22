import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'

function Products() {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            if (data.success) {
                setProducts(data.product);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])
    const content = (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Product List</h1>
                        <div className='d-flex flex-wrap'>
                            {products?.map((p) => (
                                <Link key={p._id} className='product-link' to={`/dashboard/admin/product/${p.slug}`}
                                >
                                    <div className="card m-2" style={{ width: '18rem'}} key={p._id}>
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={'200px'} alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 67)}..</p>
                                        </div>
                                    </div>

                                </Link>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

    return content
}

export default Products