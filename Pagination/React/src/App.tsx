import { useCallback, useEffect, useState } from "react";

import "./App.css";
import { getPhotos } from "./services/getPhotos";
import { photo } from "./types";
import Gallery from "./components/Gallery";
import Pagination from "./components/Pagination";
import { PER_PAGE } from "./constants";

function App() {
  const [photos, setPhotos] = useState<photo[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    (async () => {
      const { photos, picslength } = await getPhotos(page);
      if (!total) {
        setTotal(Math.ceil(picslength / PER_PAGE));
      }
      setPhotos(photos);
    })();
  }, [page]);

  const onNextHandler = useCallback(() => {
    if (total != null && page < total) {
      setPage((prev) => prev + 1);
    }
  }, [total]);

  const onPrevHandler = useCallback((curpage:number) => {
    if (curpage > 1) {
      setPage((prev) => prev - 1);
    }
  }, []);
  const onPageHandler = useCallback((page: number) => {
    setPage(page);
  }, []);
  return (
    <>
      <Gallery photos={photos} />
      <Pagination
        totalpages={total}
        currentPage={page}
        onPage={onPageHandler}
        onNext={onNextHandler}
        onPrev={onPrevHandler}
      ></Pagination>
    </>
  );
}

export default App;
