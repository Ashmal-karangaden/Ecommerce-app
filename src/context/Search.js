import { useState, useContext, createContext, useEffect } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState({
         keyword:'',
          results:[]
         })
useEffect(()=>{
     const data = localStorage.getItem('searchProducts')
     console.log(data)
},[])
    return (
        <SearchContext.Provider value={[search,setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook

const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }