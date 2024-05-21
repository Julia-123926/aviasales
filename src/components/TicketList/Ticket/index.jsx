import React from "react";
import styles from "./Ticket.module.scss";
import LogoS7 from "../../../assets/S7.png";
import TicketData from "./TicketData";

const Ticket = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ticketTop}>
        <span className={styles.ticketPrice}>13400 P</span>
        <img src={LogoS7} alt="S7_logo" />
      </div>
      <div className={styles.space}>
        <TicketData />
        <TicketData />
      </div>
    </div>
  );
};

export default Ticket;
