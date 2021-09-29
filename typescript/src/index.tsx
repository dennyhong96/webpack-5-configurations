import React, { FC } from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";
import "./styles/index.scss";

const App: FC = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

ReactDOM.render(<App>Hello, App!</App>, document.querySelector("#root"));
