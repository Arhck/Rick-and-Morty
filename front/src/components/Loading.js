import "./Loading.css";

function Loading(props) {
  setTimeout(() => {
    props.setLoading(false);
  }, 1000);
  return (
    <div className="fundo-blur">
      <div className="container-img">
        <img alt="loading" src={require("../files/loading.png")} />
        <h2>Loading</h2>
      </div>
    </div>
  );
}
export default Loading;
