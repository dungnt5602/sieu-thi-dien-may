import React from "react";

const CategoryItems = [
  {
    icon: "air-conditioner",
    title: "Máy lạnh, Máy lọc không khí",
    href: "/may-lanh-may-loc-khong-khi",
    subcat: [
      {
        title: "Máy lạnh",
        href: "may-lanh",
        brands: [
          {
            brand_name: "",
            href: "",
          },
        ],
      },
      {
        title: "Máy lọc không khí",
        href: "may-loc-khong-khi",
        brands: [
          {
            brand_name: "",
            href: "",
          },
        ],
      },
    ],
  },
];

export const CategoryList = () => {
  return (
    <div>
      <ul className="category_items">
        {categoryItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </div>
  );
};
