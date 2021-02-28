import {Flex, useBreakpointValue} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Navbuttons} from "./NavButtons.js";
import {NavHeader} from "./NavHeader.js";
import React from "../../_snowpack/pkg/react.js";
const NavContent = () => {
  const navItems = useBreakpointValue({
    base: /* @__PURE__ */ React.createElement(Flex, {
      direction: "column",
      w: "100%"
    }, /* @__PURE__ */ React.createElement(Flex, {
      direction: "row",
      justifyContent: "space-between"
    }, /* @__PURE__ */ React.createElement(NavHeader, null)), /* @__PURE__ */ React.createElement(Flex, {
      justify: "center",
      mb: 2
    }, /* @__PURE__ */ React.createElement(Navbuttons, null))),
    md: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(NavHeader, null), /* @__PURE__ */ React.createElement(Navbuttons, null))
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, navItems);
};
export const Nav = ({children}) => {
  const borderBColor = "black";
  return /* @__PURE__ */ React.createElement(Flex, {
    as: "nav",
    w: "100%",
    h: "auto",
    minH: "4rem",
    rounded: "sm",
    justifyContent: "space-between",
    wrap: "wrap",
    zIndex: 200,
    position: "absolute",
    top: 0,
    bg: "white",
    boxSizing: "content-box",
    style: {boxShadow: "0 1px 2px 0 #bababa"},
    borderBottomColor: borderBColor
  }, /* @__PURE__ */ React.createElement(NavContent, null), children);
};
