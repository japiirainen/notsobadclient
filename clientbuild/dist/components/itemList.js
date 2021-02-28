import React, {useState, useEffect} from "../../_snowpack/pkg/react.js";
import ReactPaginate from "../../_snowpack/pkg/react-paginate.js";
import {Flex, Heading, Table, Tbody, Td, Th, Thead, Tr} from "../../_snowpack/pkg/@chakra-ui/react.js";
import "../app.css.proxy.js";
export const ItemList = ({category, data}) => {
  const [pagination, setPagination] = useState({
    data,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: void 0
  });
  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }));
  }, [pagination.numberPerPage, pagination.offset]);
  const handlePageClick = (event) => setPagination({...pagination, offset: event.selected * pagination.numberPerPage});
  if (!data) {
    return /* @__PURE__ */ React.createElement(Flex, {
      mt: 100,
      alignItems: "center",
      justify: "center"
    }, /* @__PURE__ */ React.createElement(Heading, {
      fontFamily: "main"
    }, "no data..."));
  }
  return /* @__PURE__ */ React.createElement(Flex, {
    mt: 100,
    flexDir: "column",
    justify: "center"
  }, /* @__PURE__ */ React.createElement(Heading, {
    fontFamily: "main",
    textAlign: "center"
  }, category.toUpperCase()), /* @__PURE__ */ React.createElement(Table, {
    h: 600,
    w: 800,
    fontFamily: "main",
    mt: 15,
    size: "sm",
    variant: "simple"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, "name"), /* @__PURE__ */ React.createElement(Th, null, "id"), /* @__PURE__ */ React.createElement(Th, null, "color"), /* @__PURE__ */ React.createElement(Th, null, "manufacturer"), /* @__PURE__ */ React.createElement(Th, null, "price"), /* @__PURE__ */ React.createElement(Th, null, "type"), /* @__PURE__ */ React.createElement(Th, null, "availability"))), /* @__PURE__ */ React.createElement(Tbody, null, pagination.currentData && pagination.currentData.map((p, i) => {
    return /* @__PURE__ */ React.createElement(Tr, {
      key: i
    }, /* @__PURE__ */ React.createElement(Td, null, p.name), /* @__PURE__ */ React.createElement(Td, null, p.id), /* @__PURE__ */ React.createElement(Td, null, p.color.map((color) => /* @__PURE__ */ React.createElement("p", null, color))), /* @__PURE__ */ React.createElement(Td, null, p.manufacturer), /* @__PURE__ */ React.createElement(Td, null, p.price), /* @__PURE__ */ React.createElement(Td, null, p.type), /* @__PURE__ */ React.createElement(Td, null, p.availability));
  }))), /* @__PURE__ */ React.createElement(ReactPaginate, {
    previousLabel: "previous",
    nextLabel: "next",
    breakLabel: "...",
    pageCount: pagination.pageCount,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 5,
    onPageChange: handlePageClick,
    containerClassName: "pagination",
    activeClassName: "active"
  }));
};
