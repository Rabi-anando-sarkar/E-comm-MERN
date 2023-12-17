import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        let result = await fetch('http://localhost:8080/products',{
          headers : {
            authorization : JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:8080/product/${id}`,{
          method: "Delete"
        });
        result = await result.json();
        if(result) {
          getProducts();
        }
    }

    const searchHandle = async (e) => {
      let key = e.target.value;
      if(key) {
        let result = await fetch(`http://localhost:8080/search/${key}`);
        result = await result.json();
        if(result) {
        setProducts(result);
      }
      } else {
        getProducts();
      }
      
    }

  return (
    <div className='product-lists'>
        <h1>Product Lists</h1>
        <input 
          type='text'
          placeholder='Search here'
          className='search-bar'
          onChange={searchHandle}
        />
        <ul>
          <li>S.No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
        {
          products.length > 0 ? products.map((item,index) =>
            <ul key={item._id}>
              <li>{index+1}</li>
              <li>{item.productname}</li>
              <li>₹{item.productprice}</li>
              <li>{item.productcategory}</li>
              <li>{item.productcompany}</li>
              <li>
                <button
                  onClick={() => deleteProduct(item._id)}
                >
                  DELETE
                </button>
                <Link
                  to={`/update/${item._id}`}
                >Update</Link>
              </li>
            </ul>
          )
          : <h1>No Results Found</h1>
        }
    </div>
  )
}

export default ProductsList