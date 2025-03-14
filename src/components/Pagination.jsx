import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pagination = ({ currentPage, startPage, endPage, maxPage, baseUrl }) => {
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= maxPage) {
            navigate(`${baseUrl}/${page}`);
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: page === currentPage ? "#007bff" : "#fff",
                        color: page === currentPage ? "#fff" : "#007bff",
                        cursor: page === currentPage ? "default" : "pointer",
                        fontWeight: page === currentPage ? "bold" : "normal",
                    }}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
