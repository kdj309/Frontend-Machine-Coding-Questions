export default function Pagination({
  onNext,
  onPrev,
  totalpages,
  onPage,
  currentPage,
}: {
  onNext: () => void;
  onPrev: (curpage:number) => void;
  onPage: (page: number) => void;
  totalpages: number | null;
  currentPage: number;
}) {
  return (
    <div className="pagination_container">
      <button
        disabled={currentPage <= 1}
        className="pagination_btn-prev"
        onClick={()=>onPrev(currentPage)}
      >
        Prev
      </button>
      {totalpages !== null ? (
        <>
          <div className="pagination_pagewise-btncontainer">
            {totalpages != null
              ? new Array(totalpages).fill(null).map((_, idx) => (
                  <button
                    onClick={() => {
                      onPage(idx + 1);
                    }}
                    className={`pagwise_btn ${
                      currentPage === idx + 1 ? "active" : ""
                    }`}
                    key={idx}
                  >
                    {idx + 1}
                  </button>
                ))
              : null}
          </div>
          <button
            disabled={currentPage >= totalpages}
            className="pagination_btn-next"
            onClick={onNext}
          >
            Next
          </button>
        </>
      ) : null}
    </div>
  );
}
