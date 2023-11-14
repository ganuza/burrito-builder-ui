import { postOrder } from "../../apiCalls";
import { useState } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputError, setInputError] = useState('')

  function addIngredients(e) {
    e.preventDefault()
    const newIngredient = e.target.value
    setIngredients([...ingredients, newIngredient])
  }

  console.log('ingredient: ', ingredients)

  function handleSubmit(e) {
    e.preventDefault();

    if(!ingredients.length || !name) {
      setInputError('Please fill in both a name and at least 1 ingredient.')
      clearInputs()
      return
    }

    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients
    }

    console.log('newOrder: ', newOrder)
    postOrder(newOrder)
    .then(data => {
      props.addOrder(data)
      setInputError('')
      clearInputs();
    })
    .catch(error => console.log(error))
    
    
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => addIngredients(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
      {inputError && <p>{inputError}</p>}
    </form>
  );
}

export default OrderForm;
