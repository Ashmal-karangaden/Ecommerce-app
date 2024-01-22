import React from 'react'

function CategoryForm({handleSubmit,value,setvalue}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    type="name"
                    className="form-control"
                    placeholder="Enter New Category"
                    value={value}
                    onChange={(e)=>setvalue(e.target.value)}
                />
            </div>
            <button className='btn btn-primary' type='submit'>Submit</button>
        </form>
    )
}

export default CategoryForm