import _ from "lodash";

function handleClick() {
  const el = document.createElement("div");
  el.innerHTML = _.join(["Denny", "Hong"], " ");
  document.querySelector("#root").append(el);
}

export default handleClick;
