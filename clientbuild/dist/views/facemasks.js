import React from "../../_snowpack/pkg/react.js";
import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {LSpinner} from "../components/lSpinner.js";
import {getCategory} from "../api/category.js";
import {ItemList} from "../components/itemList.js";
export const FaceMasks = () => {
  const {data} = useQuery("facemasks", () => getCategory("facemasks"));
  if (!data?.categoryWithAvailabilities) {
    return /* @__PURE__ */ React.createElement(LSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(ItemList, {
    category: "facemasks",
    data: data.categoryWithAvailabilities
  });
};
