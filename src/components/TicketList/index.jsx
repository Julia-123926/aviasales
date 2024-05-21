import React from "react";
import styles from "./TicketList.module.scss";
import Ticket from "./Ticket";

const TicketList = () => {
  return (
    <ul className={styles.ticketList}>
      <li className={styles.listItem}>
        <Ticket />
      </li>
      <li className={styles.listItem}>
        <Ticket />
      </li>
      <li className={styles.listItem}>
        <Ticket />
      </li>
      <li className={styles.listItem}>
        <Ticket />
      </li>
      <li className={styles.listItem}>
        <Ticket />
      </li>
      <button className={styles.showMore}>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</button>
    </ul>
  );
};

export default TicketList;
