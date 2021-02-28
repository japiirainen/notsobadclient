import React, {useState} from "../../_snowpack/pkg/react.js";
import {Flex, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from "../../_snowpack/pkg/@chakra-ui/react.js";
import InfiniteScroll from "../../_snowpack/pkg/react-infinite-scroll-component.js";
import {LSpinner} from "./lSpinner.js";
export const ItemList = ({category, data}) => {
  const [count, setCount] = useState({
    prev: 0,
    next: 20
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(data.slice(count.prev, count.next));
  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)));
    }, 500);
    setCount((prevState) => ({prev: prevState.prev + 10, next: prevState.next + 10}));
  };
  if (!data) {
    return /* @__PURE__ */ React.createElement(Flex, {
      mt: 150,
      alignItems: "center",
      justify: "center"
    }, /* @__PURE__ */ React.createElement(Heading, null, "no data..."));
  }
  return /* @__PURE__ */ React.createElement(InfiniteScroll, {
    dataLength: current.length,
    next: getMoreData,
    hasMore,
    loader: /* @__PURE__ */ React.createElement(LSpinner, null)
  }, /* @__PURE__ */ React.createElement(Flex, {
    mt: 150,
    flexDir: "column",
    justify: "center"
  }, /* @__PURE__ */ React.createElement(Heading, {
    textAlign: "center"
  }, category), /* @__PURE__ */ React.createElement(Table, {
    variant: "simple"
  }, /* @__PURE__ */ React.createElement(TableCaption, null, category), /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "name"), /* @__PURE__ */ React.createElement(Th, null, "id"), /* @__PURE__ */ React.createElement(Th, null, "color"), /* @__PURE__ */ React.createElement(Th, null, "manufacturer"), /* @__PURE__ */ React.createElement(Th, null, "price"), /* @__PURE__ */ React.createElement(Th, null, "type"), /* @__PURE__ */ React.createElement(Th, null, "availability"))), /* @__PURE__ */ React.createElement(Tbody, null, current && current.map((p, i) => {
    return /* @__PURE__ */ React.createElement(Tr, {
      key: i
    }, /* @__PURE__ */ React.createElement(Td, null, p.name), /* @__PURE__ */ React.createElement(Td, null, p.id), /* @__PURE__ */ React.createElement(Td, null, p.color.map((color) => /* @__PURE__ */ React.createElement("p", null, color))), /* @__PURE__ */ React.createElement(Td, null, p.manufacturer), /* @__PURE__ */ React.createElement(Td, null, p.price), /* @__PURE__ */ React.createElement(Td, null, p.type), /* @__PURE__ */ React.createElement(Td, null, p.availability));
  })))));
};
