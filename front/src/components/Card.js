import "./Card.css";

function Card(props) {
  const char = props.char;
  const modalHandler = props.modalHandler;

  const clickHandler = (event) => {
    modalHandler(char.id);
  };

  return (
    <div className="card" onClick={clickHandler} id={char.id}>
      <img
        src={char.image}
        className="img-perfil"
        style={char.status === "Dead" ? { filter: "grayscale(100%)" } : {}}
        alt={char.name}
      />
      <p className="name">{char.name}</p>
      <p className="species">{char.species}</p>
    </div>
  );
}
export default Card;
