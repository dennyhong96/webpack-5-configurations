import "./styles/index.scss";
import React, { FC } from "react";
import ReactDOM from "react-dom";

const App: FC = ({ children }) => {
  return <div>{children}</div>;
};

ReactDOM.render(<App>Hello, App!</App>, document.querySelector("#root"));
