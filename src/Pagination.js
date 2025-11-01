import React from "react";
import "./Styles.css";

export default function Footer({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="pagination">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      <div className="page-numbers">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}
