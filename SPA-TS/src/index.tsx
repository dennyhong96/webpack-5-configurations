import React, { FC, Fragment } from "react";
import ReactDOM from "react-dom";

import Child from "@/components/Child";

import styles from "./index.module.scss";
import "./styles/index.scss";

const App: FC = ({ children }) => {
  return (
    <Fragment>
      <h1 className={styles.heading}>{children}</h1>
      <Child />
    </Fragment>
  );
};

ReactDOM.render(<App>Hello, App!</App>, document.querySelector("#root"));
