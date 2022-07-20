import React from "react";
import main from "./css/various.module.css"

export default function Pagination({vgsPerPage, totalVgs, paginate}) {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalVgs / vgsPerPage); i++) {
        pageNumbers.push(i);
    }

    return <div className={main.paginationDiv}>
    {pageNumbers.length > 0  ? 
            <nav className={main.pagination}>
                    {pageNumbers.map(number => (
                        <li key={number} className = {main.number}>
                            <a onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))}
            </nav>
         : null }
    </div>
};