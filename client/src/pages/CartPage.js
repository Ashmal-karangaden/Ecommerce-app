import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout.js'
import { useCart } from '../context/cart.js'
import { useAuth } from '../context/auth.js'
import { useNavigate } from 'react-router-dom'

function CartPage() {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    //Total Price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + JSON.parse(item.price);
            });
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text--center bg-light p-2 mb-1'>
                            {`Hello${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 1 ? ` You Have ${cart.length} item in your cart ${auth?.token ? ''
                                : "Please login to checkout"}` : 'Your Cart Is Empty'}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">

                        {cart?.map((p) => (
                            <div className="row m-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img
                                        height={'150px'}
                                        width={'50px'}
                                        className='card-img-top pb-1 pt-1'
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name} />
                                </div>

                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 80)}</p>
                                    <p>Price : {p.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>


                        ))}
                    </div>
                    <div className="col-md-4">
                        <h2 className="text-center">Cart Summary</h2>
                        <p className='text-center'>Total| Checkout| Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user.address}</h5>
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</button>
                                ) : (
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => navigate('/login', {
                                            state: '/cart'
                                        })}
                                    >Please Login to checkout</button>
                                )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage