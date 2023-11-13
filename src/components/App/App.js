import { useState, useEffect } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  
  const [orders, setOrders] = useState()
  console.log('orders:', orders)

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder])
  }

  useEffect(() => {
    getOrders()
    .then(data => {
      console.log('data: ', data.orders)
      setOrders(data.orders)
    })
    .catch((err) => console.error("Error fetching:", err));
  }, []);



  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>
      {!orders ? <p>Loading...</p> :
      <Orders orders={orders} />}
    </main>
  );
}

export default App;
