import styles from "./layout.module.css";

const KitchenLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      {props.children}

      {/* Render mobile not available */}
      <div className={`bold ${styles.mobile}`}>
        TinyBento is currently only available on Desktop
      </div>
    </div>
  );
};

export default KitchenLayout;
