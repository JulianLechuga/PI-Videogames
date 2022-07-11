import React from "react";
import main from "./various.module.css"

export default function Pagination({vgsPerPage, totalVgs, paginate}) {
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVgs / vgsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
            <nav className={main.pagination}>
                    {pageNumbers.map(number => (
                        <li key={number} className = {main.number}>
                            <a onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))}
            </nav>
    )
}