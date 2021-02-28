import {Flex} from "../_snowpack/pkg/@chakra-ui/react.js";
import React from "../_snowpack/pkg/react.js";
import {Route, Switch} from "../_snowpack/pkg/react-router-dom.js";
import {Nav} from "./components/Nav.js";
import {Beanies} from "./views/beanies.js";
import {FaceMasks} from "./views/facemasks.js";
import {Gloves} from "./views/gloves.js";
import {Home} from "./views/home.js";
const App = () => {
  return /* @__PURE__ */ React.createElement(Flex, {
    m: 0,
    p: 0,
    justify: "center"
  }, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(Flex, {
    className: "App",
    flexDirection: "column",
    alignItems: "center",
    maxW: 1500,
    w: 1500
  }, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/"
  }, /* @__PURE__ */ React.createElement(Home, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/beanies"
  }, /* @__PURE__ */ React.createElement(Beanies, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/facemasks"
  }, /* @__PURE__ */ React.createElement(FaceMasks, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/gloves"
  }, /* @__PURE__ */ React.createElement(Gloves, null)))));
};
export default App;
