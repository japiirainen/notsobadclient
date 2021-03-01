import {Box, Link} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React from "../../_snowpack/pkg/react.js";
import {NavLink} from "../../_snowpack/pkg/react-router-dom.js";
import "../app.css.proxy.js";
export const Navbuttons = () => {
  return /* @__PURE__ */ React.createElement(Box, {
    mt: 5
  }, /* @__PURE__ */ React.createElement(NavLink, {
    to: "/beanies",
    activeClassName: "activenavbutton"
  }, /* @__PURE__ */ React.createElement(Link, {
    mx: 1,
    my: 0
  }, "Beanies")), /* @__PURE__ */ React.createElement(NavLink, {
    to: "/facemasks",
    activeClassName: "activenavbutton"
  }, /* @__PURE__ */ React.createElement(Link, {
    mx: 4,
    my: 0
  }, "Face masks")), /* @__PURE__ */ React.createElement(NavLink, {
    to: "/gloves",
    activeClassName: "activenavbutton"
  }, /* @__PURE__ */ React.createElement(Link, {
    mx: 1,
    mr: 3
  }, "Gloves")));
};
