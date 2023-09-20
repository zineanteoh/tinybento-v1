import React from "react";
import styles from "./Resizable.module.css";
import { Resizable } from "re-resizable";

const CustomResizable = () => {
  return (
    <Resizable
      className={styles.resizable}
      defaultSize={{
        width: 200,
        height: 200,
      }}
      minWidth={100}
      maxWidth={600}
      minHeight={100}
      maxHeight={600}
      grid={[100, 100]}
      // bounds={"parent"} // specify resize boundary
      handleStyles={{
        bottomRight: { display: "none" },
        bottomLeft: { display: "none" },
        topRight: { display: "none" },
        topLeft: { display: "none" },
      }}
    />
  );
};

export default CustomResizable;
