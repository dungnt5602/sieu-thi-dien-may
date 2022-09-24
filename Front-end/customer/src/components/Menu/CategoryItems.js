import React from "react";

export const CategoryItems = ({ items }) => {
  return (
    <li className="category_items">
      {items.subcat ? (
        <>
          <button type="button" aria-haspopup="menu">
            {items.title}{" "}
          </button>
          <Dropdown subcats={items.subcat} />
        </>
      ) : (
        <a href={items.href}>{items.subcat}</a>
      )}
    </li>
  );
};
