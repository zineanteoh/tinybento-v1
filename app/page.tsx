import React from "react";
import Link from "next/link";
import styles from "@app/page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Link href="/kitchen">Enter the Kitchen</Link>
    </div>
  );
};

export default Home;
