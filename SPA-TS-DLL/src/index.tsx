import React, { FC, Fragment } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";

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

$("body").append(`<div id="root"></div>`);

ReactDOM.render(<App>{_.join(["Denny", "Hong"], " ")}</App>, document.querySelector("#root"));
