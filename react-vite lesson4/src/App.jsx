import React, { useState } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [items, setItems] = useState([
    { id: uuidv4(), name: "watermelon", isPurchased: false },
    {
      id: uuidv4(),
      name: "tomato",
      isPurchased: false,
    },
  ]);

  const [itemToAdd, setItemToAdd] = useState({
    name: "",
    isPurchased: false,
    id: uuidv4(),
  });

  const onChangeHandler = (e) => {
    setItemToAdd({ name: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const arrOfItems = items.map((el) => el.name.toLowerCase());

    if (!itemToAdd.name.trim()) {
      console.log("Your input must contain characters");
      return;
    }

    if (arrOfItems.includes(itemToAdd.name.toLowerCase())) {
      console.log("This item is already in your list");
      return;
    }

    if (itemToAdd.name.trim()) {
      setItems([...items, itemToAdd]);
      setItemToAdd({ name: "", isPurchased: false });
    }
  };

  let onDeleteHandler = (id) => {
    setItems(items.filter((el) => el.id !== id));
  };
  let onCheckHandler = (id) => {
    setItems(
      items.map((el) =>
        el.id === id ? { ...el, isPurchased: !el.isPurchased } : el
      )
    );
  };
  return (
    <>
      <form action="" onSubmit={onSubmitHandler}>
        <input
          placeholder="Add item"
          onChange={onChangeHandler}
          value={itemToAdd.name}
        />
        <button type="submit">Add to list</button>
      </form>

      <div>
        <ul>
          {items.map((el) => (
            <li className="item" key={el.id}>
              <input
                type="checkbox"
                checked={el.isPurchased}
                onChange={() => onCheckHandler(el.id)}
              />
              <p className={el.isPurchased ? "purchase" : ""}>{el.name}</p>
              <button onClick={() => onDeleteHandler(el.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
