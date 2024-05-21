import React from "react";
import styles from "./TicketData.module.scss";

const TicketData = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <span className={styles.filterName}>MOW – HKT</span>
        <span className={styles.filterValue}>10:45 – 08:00</span>
      </div>
      <div className={styles.item}>
        <span className={styles.filterName}>В ПУТИ</span>
        <span className={styles.filterValue}>21ч 15м</span>
      </div>
      <div className={styles.item}>
        <span className={styles.filterName}>2 ПЕРЕСАДКИ</span>
        <span className={styles.filterValue}>HKG, JNB</span>
      </div>
    </div>
  );
};

export default TicketData;
