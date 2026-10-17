import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // If there's only 1 page or none, don't show pagination buttons
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        alignItems: "center",
        marginTop: "30px",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        style={{ padding: "6px 14px", cursor: page === 1 ? "not-allowed" : "pointer" }}
      >
        ← Previous
      </button>

      <span>
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        style={{ padding: "6px 14px", cursor: page === totalPages ? "not-allowed" : "pointer" }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
