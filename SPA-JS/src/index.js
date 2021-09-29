import React from "react";
import ReactDOM from "react-dom";

import styles from "./index.module.scss";
import "./styles/index.scss";

const App = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

ReactDOM.render(<App>Hello, App!</App>, document.querySelector("#root"));

// const $button = document.createElement("button");
// $button.innerHTML = "Press Me";
// $button.classList.add(styles.button);
// $button.addEventListener("click", async function () {
//   const { default: handleClick } = await import(
//     /* webpackPreload: true */ /* webpackChunkName: "click" */ "./click"
//   );
//   handleClick();
// });
// document.querySelector("#root").append($button);

// To enable HMR
// if (module.hot) {
//   module.hot.accept("./components/Counter", () => {
//     console.log("Accepting the updated Counter module!");
//     counter.$el.remove();
//     new Counter($root);
//   });
// }
