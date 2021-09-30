import React, { FC, Fragment } from "react";
import ReactDOM from "react-dom";

import Child from "@/components/Example";

const Home: FC = () => {
  return (
    <Fragment>
      <h1>Home</h1>
      <a href="/about.html">about</a>
      <Child />
    </Fragment>
  );
};

ReactDOM.render(<Home />, document.querySelector("#root"));
