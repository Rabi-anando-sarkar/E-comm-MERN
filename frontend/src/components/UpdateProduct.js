import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:8080/product/${params.id}`);
        result = await result.json();

        setName(result.productname);
        setPrice(result.productprice);
        setCompany(result.productcompany);
        setCategory(result.productcategory);
    }

    const updateProduct = async () => {
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:8080/product/${params.id}`,{
            method : "Put",
            body : JSON.stringify({
                productname : name,
                productprice : price,
                productcategory : category,
                productcompany : company
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    
  return (
    <div className='update-product'>
        <h1>Update Product</h1>
        <input
            type='text'
            placeholder='Enter Product Name'
            className='inputBox'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type='text'
            placeholder='Enter Product Price'
            className='inputBox'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <input
            type='text'
            placeholder='Enter Product Category'
            className='inputBox'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />
        <input
            type='text'
            placeholder='Enter Product Company'
            className='inputBox'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
        />
        <button 
            className='product-button'
            onClick={updateProduct}
        >
        Update Product
        </button>
    </div>
  )
}

export default UpdateProduct