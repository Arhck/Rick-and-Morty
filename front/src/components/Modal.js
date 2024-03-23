import "./Modal.css";

function Modal(props) {
  const charInfo = props.charInfo;
  const setModal = props.setModal;

  const onClose = (event) => {
    setModal(false);
    console.log(charInfo);
  };
  return (
    //DIV CONTAINER PRINCIPAL
    <div className="modal">
      {/* DIV CONTAINER DE CONTEÚDO */}
      <div className="modal-content">
        {/* DIV "CARD" */}
        <div className="card-copy">
          <img
            className="profile"
            alt="profile"
            src={charInfo.image}
            style={
              charInfo.status === "Dead" ? { filter: "grayscale(100%)" } : {}
            }
          />
          <h2 className="name">{charInfo.name}</h2>
          <p className="species">{charInfo.species}</p>
        </div>
        {/* DIV IMG BLURRED E DADOS DE PESQUISA */}
        <div className="modal-dex">
          {/* DIV COLUNA DA IMAGEM E DO BOTÃO */}
          <div className="coluna1">
            <button className="close" onClick={onClose}>
              Close
            </button>
            <div className="imagem-containter">
              <img className="img-blurred" alt="profile" src={charInfo.image} />
            </div>
          </div>
          {/* DIV DO RESULTADO DA PESQUISA */}
          <div className="char-data">
            <h2>ABOUT</h2>
            <p>
              {charInfo.name} is a {charInfo.gender.toLowerCase()}{" "}
              {charInfo.species.toLowerCase()}.{" "}
              {charInfo.gender === "Female"
                ? "She"
                : charInfo.gender === "Male"
                ? "He"
                : "It"}{" "}
              is{" "}
              {charInfo.status === "Alive"
                ? "alive and well."
                : "stone-cold dead."}
            </p>
            <h2>ORIGIN</h2>
            <h3>Planet</h3>
            <h1>{charInfo.origin_name}</h1>
            <h2>LOCATION</h2>
            <h3>Planet</h3>
            <h1>{charInfo.location_name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
