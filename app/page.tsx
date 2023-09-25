import React from "react";
import Link from "next/link";
import styles from "@app/page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Link href="/demo/1">Demo 1</Link>
      {/* TODO: add more demos here */}
    </div>
  );
};

export default Home;
