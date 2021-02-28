import React from "../../_snowpack/pkg/react.js";
import {Flex, Spinner} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Nav} from "./Nav.js";
export const LSpinner = () => {
  return /* @__PURE__ */ React.createElement(Flex, {
    justify: "center"
  }, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(Spinner, {
    mt: 100,
    size: "lg"
  }));
};
