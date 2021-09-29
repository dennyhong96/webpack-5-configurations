import _ from "lodash";
import $ from "jquery";

import "./styles/index.scss";
import styles from "./styles/modules/index.module.scss";

const $el = $("div");
$el.html(_.join(["Denny", "Hong"], " "));
$("#root").append($el);

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
