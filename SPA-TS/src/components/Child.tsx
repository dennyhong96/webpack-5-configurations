import React, { FC } from "react";

import styles from "../index.module.scss";

const Child: FC = () => {
  return <h2 className={styles.heading}>Child</h2>;
};

export default Child;
