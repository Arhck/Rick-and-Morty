import "./SearchBox.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

function SearchBox(props) {
  const [valorInput, setValorInput] = useState("");
  const handleChange = (event) => {
    setValorInput(event.target.value);
  };
  const clickHandler = async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/?name=${valorInput}`
    );
    props.enviarDados(response.data);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      clickHandler();
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search characters"
        id="search"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" onClick={clickHandler}>
        Search
      </button>
    </div>
  );
}

export default SearchBox;
