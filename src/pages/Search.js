import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useSearch } from '../context/Search.js'
const Search = () => {
    const [values,setValues] = useSearch()
    console.log(values)
    const content = (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.results?.length < 1
                     ? 'No Products Found '
                     : `Found ${values?.results?.length}`}
                     </h6>
                </div>
            </div>
        </Layout>
    )
    return content
}

export default Search