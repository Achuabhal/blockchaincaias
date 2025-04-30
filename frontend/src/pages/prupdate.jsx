import React, { useState, useEffect } from 'react';
import api from '../conection/axios';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '', description: '', price: '', imageUrl: '', account: ''
  });
  const [account, setAccount] = useState(null);

  // Load MetaMask account
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if (accounts.length > 0) setAccount(accounts[0]);
        })
        .catch(console.error);
    }
  }, []);

  // Sync account into product
  useEffect(() => {
    if (account) {
      setProduct(prev => ({ ...prev, account }));
    }
  }, [account]);

  const handleChange = ({ target: { name, value } }) => {
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/api', product)
       .then(res => alert('Saved!'))
       .catch(err => alert('Failed!'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Account: {account}</p>
      <input name="name"      value={product.name}      onChange={handleChange} placeholder="Product Name" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
      <input name="price"     type="number" value={product.price}     onChange={handleChange} placeholder="Price" />
      <input name="imageUrl"  type="url"    value={product.imageUrl}  onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Save Product</button>
    </form>
  );
}

export default ProductForm;
