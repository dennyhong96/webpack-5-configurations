import { add } from "./math";

import "./styles/index.scss";

console.log(add(4, 5));

// To enable HMR
// if (module.hot) {
//   module.hot.accept("./components/Counter", () => {
//     console.log("Accepting the updated Counter module!");
//     counter.$el.remove();
//     new Counter($root);
//   });
// }
