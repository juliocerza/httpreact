
import './App.css';

import { useState, useEffect } from 'react';

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  // 1 - resgatando dados
  useEffect(() => {
    async function FetchData() {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }
    FetchData();
  }, []);

  // 2 - add products
  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = {
      name,
      price
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(product)
    })
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - R$ {p.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
