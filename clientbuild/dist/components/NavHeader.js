import {Heading, useColorModeValue} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import React from "../../_snowpack/pkg/react.js";
export const NavHeader = () => {
  const navheaderColor = useColorModeValue("black", "neonPurple.100");
  const router = useHistory();
  return /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("a", null, /* @__PURE__ */ React.createElement(Heading, {
    mt: 3,
    mx: 3,
    fontSize: {base: "1.8rem", md: "2rem"},
    fontFamily: "navHeader",
    color: navheaderColor,
    onClick: () => router.push("/"),
    _hover: {cursor: "pointer"}
  }, "Products")));
};
