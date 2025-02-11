import "./App.css";
import { useEffect, useState } from "react";
const PAGESIZE = 9;
function App() {
  const [countries, setcountries] = useState([]);
  const [allCountries, setallCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setpage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setallCountries(
        data.map((c) => ({ name: c.name.common, flag: c.flags.svg }))
      );
      setTotalPages(Math.floor(data.length / PAGESIZE));
      setcountries(
        data
          .slice(0, PAGESIZE)
          .map((c) => ({ name: c.name.common, flag: c.flags.svg }))
      );
    })();
  }, []);


  function previousHandler(page) {
    const decrementedpage = page - 1;
    setpage(decrementedpage);
    setcountries(
      allCountries.slice((decrementedpage - 1) * PAGESIZE, decrementedpage * PAGESIZE)
    );
  }
  function nextHandler(page) {
    const incrementedpage = page + 1;
    setpage(incrementedpage);
    setcountries(
      allCountries.slice((incrementedpage - 1) *PAGESIZE, incrementedpage * PAGESIZE)
    );
  }
  function pageHandler(page) {
    setpage(page);
    setcountries(allCountries.slice((page - 1) * PAGESIZE, page * PAGESIZE));
  }
  return (
    <>
      <div className="country-container">
        {countries.map((c) => {
          return (
            <div className="country-card" key={c.name}>
              <div className="country-text">
                <img className="country-flag" src={c.flag}></img>
                <h3>{c.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="page-container">
        <button disabled={page === 1} onClick={() => previousHandler(page)}>
          Prev
        </button>
        <div>
          {new Array(totalPages).fill(null).map((_, indx) => (
            <button
              className={`${indx + 1 === page ? "active" : "btn"}`}
              onClick={() => pageHandler(indx+1)}
              key={indx}
            >
              {indx + 1}
            </button>
          ))}
        </div>
        <button disabled={page===totalPages} onClick={() => nextHandler(page)}>Next</button>
      </div>
    </>
  );
}

export default App;
