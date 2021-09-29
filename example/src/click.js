function handleClick() {
  const el = document.createElement("div");
  el.innerHTML = "Denny Hong";
  document.querySelector("#root").append(el);
}

export default handleClick;
