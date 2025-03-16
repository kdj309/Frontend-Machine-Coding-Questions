import "./App.css";
import { useEffect, useState,useCallback } from "react";
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

  const paginationHandler = useCallback(
    function (page, isIncrementOperation = false, isPageOperation = false) {
      let newpage;
      if (isPageOperation) {
        newpage = page;
      } else if (isIncrementOperation) {
        newpage = page + 1;
      } else {
        newpage = page - 1;
      }
      setpage(newpage);
      setcountries(
        allCountries.slice((newpage - 1) * PAGESIZE, newpage * PAGESIZE)
      );
    },
    [allCountries]
  );

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
        <button disabled={page === 1} onClick={() => paginationHandler(page)}>
          Prev
        </button>
        <div>
          {new Array(totalPages).fill(null).map((_, indx) => (
            <button
              className={`${indx + 1 === page ? "active" : "btn"}`}
              onClick={() => paginationHandler(page + 1, false, true)}
              key={indx}
            >
              {indx + 1}
            </button>
          ))}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => paginationHandler(page, true, false)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
