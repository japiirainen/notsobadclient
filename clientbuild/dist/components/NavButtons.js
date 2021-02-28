import {Box, Button} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React from "../../_snowpack/pkg/react.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
export const NavButton = ({label, onClick, mx, my, type, loading}) => {
  return /* @__PURE__ */ React.createElement(Button, {
    mx,
    my,
    style: {borderRadius: 0},
    bg: "gray.100",
    _hover: {
      background: "black",
      color: "white"
    },
    color: "black",
    onClick,
    fontFamily: "main",
    type,
    isLoading: loading
  }, label);
};
export const Navbuttons = () => {
  const router = useHistory();
  return /* @__PURE__ */ React.createElement(Box, {
    mt: 3
  }, /* @__PURE__ */ React.createElement(NavButton, {
    mx: 1,
    my: 0,
    label: "Beanies",
    onClick: () => router.push("/beanies")
  }), /* @__PURE__ */ React.createElement(NavButton, {
    mx: 1,
    my: 0,
    label: "Face masks",
    onClick: () => router.push("/facemasks")
  }), /* @__PURE__ */ React.createElement(NavButton, {
    mx: 1,
    my: 0,
    label: "Gloves",
    onClick: () => router.push("/gloves")
  }));
};
