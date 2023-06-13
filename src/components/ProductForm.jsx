import React, { useState } from 'react';

function ProductForm({ product = {}, onSubmit }) {
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [image, setImage] = useState(product.image || '');
  const [quantity, setQuantity] = useState(product.quantity || 1); // Initialize quantity with 1 or the existing quantity of the product if available

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, price, image, quantity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
      Price:
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Image URL:
        <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} min="1" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ProductForm;
