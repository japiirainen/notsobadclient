import React from "../../_snowpack/pkg/react.js";
import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {getCategory} from "../api/category.js";
import {ItemList} from "../components/itemList.js";
import {LSpinner} from "../components/lSpinner.js";
export const Beanies = () => {
  const {data} = useQuery("beanies", () => getCategory("beanies"));
  if (!data?.categoryWithAvailabilities) {
    return /* @__PURE__ */ React.createElement(LSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(ItemList, {
    category: "beanies",
    data: data.categoryWithAvailabilities
  });
};
