import "./Pagination.css";
import axios from "axios";
import calculatePagination from "./paginationLogic.js";

function Pagination(props) {
  const queryName = props.router1.queryName;
  const pagTot = props.router1.TotPages;
  const currentPage = props.router1.Page;
  const pagination = calculatePagination(currentPage, pagTot);
  const pageHandler = async (event) => {
    const nextPage = event.target.value;
    const response = await axios.get(
      `http://127.0.0.1:5000/?page=${nextPage}&name=${queryName}`
    );
    props.setRouter1(response.data);
    props.setLoading(true);
  };

  return (
    <footer className="pagination">
      <ul>
        {currentPage >= 4 ? (
          <li value={currentPage - 1} onClick={pageHandler}>
            {"<"}
          </li>
        ) : null}
        {pagination.map((pag, index) => (
          <li
            key={index}
            value={pag}
            onClick={pageHandler}
            className={pag === currentPage ? "active" : ""}>
            {/* <button
              value={pag}
              onClick={pageHandler}
              className={pag === currentPage ? "active" : ""}
            >{pag}</button> */}
            {pag}
          </li>
        ))}
        {pagTot > 5 && currentPage < pagTot - 2 ? (
          <li value={currentPage + 1} onClick={pageHandler}>
            {">"}
          </li>
        ) : null}
      </ul>
    </footer>
  );
}
export default Pagination;
