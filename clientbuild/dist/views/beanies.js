import React from "../../_snowpack/pkg/react.js";
import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {getCategory} from "../api/category.js";
import {ItemList} from "../components/itemList.js";
import {Flex, Heading, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
export const Beanies = () => {
  const {data} = useQuery("beanies", () => getCategory("beanies"));
  if (!data?.categoryWithAvailabilities) {
    return /* @__PURE__ */ React.createElement(Flex, {
      mt: 150
    }, /* @__PURE__ */ React.createElement(Heading, null, "No beanies just yet."), /* @__PURE__ */ React.createElement(Text, null, "please try again later"));
  }
  return /* @__PURE__ */ React.createElement(ItemList, {
    category: "beanies",
    data: data.categoryWithAvailabilities
  });
};
