import React, {useState, useEffect} from "../../_snowpack/pkg/react.js";
import ReactPaginate from "../../_snowpack/pkg/react-paginate.js";
import {
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useBreakpointValue,
  useBreakpoint
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import "../app.css.proxy.js";
export const ItemList = ({category, data}) => {
  const mt = useBreakpointValue({base: 150, md: 100});
  const tableWidth = useBreakpointValue({base: "100%", md: 800});
  const tableHeight = useBreakpointValue({base: 600, md: 600});
  const bp = useBreakpoint();
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
      mt,
      alignItems: "center",
      justify: "center"
    }, /* @__PURE__ */ React.createElement(Heading, {
      fontFamily: "main"
    }, "no data..."));
  }
  return /* @__PURE__ */ React.createElement(Flex, {
    mt,
    flexDir: "column",
    justify: "center"
  }, /* @__PURE__ */ React.createElement(Heading, {
    fontFamily: "main",
    textAlign: "center"
  }, category.toUpperCase()), /* @__PURE__ */ React.createElement(Table, {
    h: tableHeight,
    w: tableWidth,
    fontFamily: "main",
    mt: 15,
    size: "sm",
    variant: "simple"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(TableHead, null))), /* @__PURE__ */ React.createElement(Tbody, null, pagination.currentData && pagination.currentData.map((p, i) => {
    if (bp !== "sm") {
      return /* @__PURE__ */ React.createElement(Tr, {
        key: i
      }, /* @__PURE__ */ React.createElement(Td, null, p.name), /* @__PURE__ */ React.createElement(Td, null, p.id), /* @__PURE__ */ React.createElement(Td, null, p.color.map((color) => /* @__PURE__ */ React.createElement("p", null, color))), /* @__PURE__ */ React.createElement(Td, null, p.manufacturer), /* @__PURE__ */ React.createElement(Td, null, p.price), /* @__PURE__ */ React.createElement(Td, null, p.type), /* @__PURE__ */ React.createElement(Td, null, p.availability));
    }
    return /* @__PURE__ */ React.createElement(Tr, {
      key: i
    }, /* @__PURE__ */ React.createElement(Td, null, p.name), /* @__PURE__ */ React.createElement(Td, null, p.type), /* @__PURE__ */ React.createElement(Td, null, p.availability));
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
const TableHead = () => {
  const bp = useBreakpoint();
  if (bp !== "sm") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("th", null, "name"), /* @__PURE__ */ React.createElement("th", null, "id"), /* @__PURE__ */ React.createElement("th", null, "color"), /* @__PURE__ */ React.createElement("th", null, "manufacturer"), /* @__PURE__ */ React.createElement("th", null, "price"), /* @__PURE__ */ React.createElement("th", null, "type"), /* @__PURE__ */ React.createElement("th", null, "availability"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("th", null, "name"), /* @__PURE__ */ React.createElement("th", null, "type"), /* @__PURE__ */ React.createElement("th", null, "availability"));
};
