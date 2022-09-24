import { brandList } from "./ListFilter";

export const generateBrandArray = (brands) => {
  if (brands.length === 0) return;
  return brands.map((brand, index) => ({ ...brandList[brand], index: index }));
};

export const generateSubQuery = (list) => {
  let query = "";
  if (list.length === 0) return "";
  else if (list.length === 1) return `${list[0].query}`;
  else {
    list.forEach((item, index) => {
      if (index === list.length - 1) query = query + `${item.query}`;
      else query = query + `${item.query}_OR_`;
    });
  }
  return `(_${query}_)`;
};

export const generateQuery = (filterList) => {
  let query = "";
  let isFirst = true;
  for (let key in filterList) {
    const trueArray = filterList[key].filter((item) => item.checked === true);
    if (trueArray.length !== 0) {
      if(isFirst === true) query = query + generateSubQuery(trueArray);
      else query = query + "_AND_" + generateSubQuery(trueArray);
    }
    if(trueArray.length !== 0) isFirst = false;
  }
  console.log(query);
  return query;
};
