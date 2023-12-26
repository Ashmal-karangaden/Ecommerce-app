import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput.js';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart.js';

function Header() {
  const [cart,setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const categories = useCategory()
  console.log(categories)
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successfully')
    navigate('/')
  }

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to='/'
            className='navbar-brand'
          >
            <span role='img'>🛒</span>  Ecommerce App
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 me-2 mb-lg-0">
              <li className="nav-item me-4" >
                <SearchInput />
              </li>
              <li className="nav-item">
                <NavLink
                  to='/'
                  className="nav-link"

                >Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link 
                className="nav-link dropdown-toggle"
                  to={'/categories'}          
                  data-bs-toggle="dropdown"
                  >
                    Categories
                </Link>
                <ul className="dropdown-menu">
                <li>
                    <Link 
                    className="dropdown-item"
                    to={`/categories`}
                    >All Categories
                    </Link>
                    </li>
                  {categories?.map((c) => (
                    <li>
                    <Link 
                    className="dropdown-item"
                    to={`/category/${c.slug}`}
                    >{c.name}
                    </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (
                  <>
                    <li
                      className="nav-item">
                      <NavLink to='/register' className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li
                      className="nav-item">
                      <NavLink to='/login' className="nav-link">
                        Login
                      </NavLink>
                    </li>

                  </>) : (<>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user?.name}
                      </button>
                      <ul
                        className="dropdown-menu"
                      >
                        <li>
                          <NavLink
                            to={`/dashboard/${auth.user?.role === 1 ? 'admin' : 'user'}`}
                            className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            className="dropdown-item">
                            LOGOUT
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <li
                      className="nav-item">
                      <NavLink to='/Cart' className="nav-link">
                        Cart ({cart?.length})
                      </NavLink>
                    </li>
                  </>)
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header