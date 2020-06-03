import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Spin } from "antd";
import "./index.less";
import App from "./App";
import { AppContainer } from "react-hot-loader";
import "moment/locale/zh-cn";

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Suspense fallback={<Spin />}>{component}</Suspense>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(<App />);

// eslint-disable-next-line no-unused-expressions
module.hot &&
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(<NextApp />);
  });
