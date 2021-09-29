// import _ from "lodash";
// import $ from "jquery";

// const $root = document.querySelector("#root");
// // const $el = document.createElement("div");
// // $el.innerHTML = _.join(["a", "b", "c"], "-");
// // $root.append($el);

// async function getComponent() {
//   // Dynamic imports (Lazy load) triggers code split
//   const { default: _ } = await import("lodash");
//   const el = document.createElement("div");
//   el.innerHTML = _.join(["a", "b", "c"], "-");
//   return el;
// }

// console.log("click");
// getComponent().then((el) => $root.append(el));

document.addEventListener("click", async function () {
  const { default: handleClick } = await import(
    /* webpackPreload: true */ "./click"
  );
  handleClick();
});

// To enable HMR
// if (module.hot) {
//   module.hot.accept("./components/Counter", () => {
//     console.log("Accepting the updated Counter module!");
//     counter.$el.remove();
//     new Counter($root);
//   });
// }
