import React, { FC, Fragment } from "react";
import ReactDOM from "react-dom";

import Child from "@/components/Example";

const About: FC = () => {
  return (
    <Fragment>
      <h1>About</h1>
      <a href="/">home</a>
      <Child />
    </Fragment>
  );
};

ReactDOM.render(<About />, document.querySelector("#root"));
