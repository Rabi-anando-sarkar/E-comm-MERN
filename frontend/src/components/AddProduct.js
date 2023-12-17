import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState(false);

    const navigate = useNavigate();

    const addProduct = async () => {
        console.log(!name);
        if(!name || !price || !category || !company) {
            setError(true);
            return false;
        }        
        console.log(name,price,category,company);
        const userID = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:8080/add-product",{
            method : 'post',
            body : JSON.stringify({
                productname : name,
                productprice : price,
                productcategory : category,
                productcompany : company,
                userId : userID,
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.log(result);

        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        navigate("/");
    }
  return (
    <div className='add-product'>
        <h1>Add Product</h1>
        <input
            type='text'
            placeholder='Enter Product Name'
            className='inputBox'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className='invalid-input'>Please Enter Data into the given Field</span>}
        <input
            type='text'
            placeholder='Enter Product Price'
            className='inputBox'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span className='invalid-input'>Please Enter Data into the given Field</span>}
        <input
            type='text'
            placeholder='Enter Product Category'
            className='inputBox'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span className='invalid-input'>Please Enter Data into the given Field</span>}
        <input
            type='text'
            placeholder='Enter Product Company'
            className='inputBox'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span className='invalid-input'>Please Enter Data into the given Field</span>}
        <button 
            className='product-button'
            onClick={addProduct}
        >
        Add Product
        </button>
    </div>
  )
}

export default AddProduct