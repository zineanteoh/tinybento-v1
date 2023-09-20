import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Link href="/demo-1">Demo 1</Link>
      <Link href="/demo-2">Demo 2</Link>
      {/* TODO: add more demos here */}
    </div>
  );
};

export default Home;
