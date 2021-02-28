import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import App from "./App.js";
import {ChakraProvider} from "../_snowpack/pkg/@chakra-ui/react.js";
import {ReactQueryDevtools} from "../_snowpack/pkg/react-query/devtools.js";
import {QueryClientProvider} from "../_snowpack/pkg/react-query.js";
import {BrowserRouter as Router} from "../_snowpack/pkg/react-router-dom.js";
import {client} from "./api/index.js";
import {theme} from "./theme.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(ChakraProvider, {
  theme
}, /* @__PURE__ */ React.createElement(QueryClientProvider, {
  client
}, /* @__PURE__ */ React.createElement(ReactQueryDevtools, {
  initialIsOpen: true
}), /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(App, null))))), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
