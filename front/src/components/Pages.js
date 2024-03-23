import Card from "./Card.js";
import Modal from "./Modal.js";
import "./Pages.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Pages(props) {
  const [charInfo, setCharInfo] = useState("");
  const chars = props.router1.Personagens;
  const [modalDisplay, setModal] = useState(false);
  const modalHandler = async (id) => {
    const response = await axios.get(`http://127.0.0.1:5000/characters/${id}`);
    setModal(true);
    setCharInfo(response.data);
  };
  useEffect(() => {}, [charInfo]);

  return (
    <div className="container">
      {chars.map((char, index) => (
        <Card key={index} char={char} modalHandler={modalHandler} />
      ))}
      {modalDisplay && <Modal charInfo={charInfo} setModal={setModal} />}
    </div>
  );
}
export default Pages;
