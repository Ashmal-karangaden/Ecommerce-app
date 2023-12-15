import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate } from 'react-router-dom'

function SearchInput() {
    const [values, setValues] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            const {data} = await axios.get(`/api/v1/product/search-product/${values.keyword}`)
            setValues({...values, results: data})
            navigate('/search')
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
    }

    const handleValues = (e) => setValues({...values,keyword : e.target.value})
    return (
        <form className="d-flex ms-5 " onSubmit={handleSubmit}>
            <input className="form-control me-2"
                style={{ width: '500px' }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={values.keyword}
                onChange={handleValues}
            />
            <button className="btn btn-outline-success" type="submit"
            >Search
            </button>
        </form>
    )
}

export default SearchInput