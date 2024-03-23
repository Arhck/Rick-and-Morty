import "./App.css";
import SearchBox from "./components/SearchBox.js";
import Pages from "./components/Pages.js";
import Pagination from "./components/Pagination.js";
import Loading from "./components/Loading";
import { useState, useEffect } from "react";

function App() {
  const [router1, setRouter1] = useState("");
  const [evento, setEvento] = useState(false);
  const [loading, setLoading] = useState(false);

  const rota1 = (dados) => {
    setLoading(true);
    setRouter1(dados);
    setEvento(true);
  };
  useEffect(() => {}, [router1]);
  useEffect(() => {}, [loading]);

  return (
    <div className="App">
      {loading && <Loading setLoading={setLoading} />}
      <header className="App-header">
        <img
          src={require("./files/logo.png")}
          className="App-logo"
          alt="logo"
        />
      </header>
      <SearchBox enviarDados={rota1} />
      <br />
      {evento && <Pages router1={router1} />}
      {evento && (
        <Pagination
          router1={router1}
          setRouter1={setRouter1}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default App;
