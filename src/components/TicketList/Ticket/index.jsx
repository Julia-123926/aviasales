import React from "react";
import styles from "./Ticket.module.scss";
import LogoS7 from "../../../assets/S7.png";
import TicketData from "./TicketData";

const Ticket = ({ price, segments }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ticketTop}>
        <span className={styles.ticketPrice}>{price} P</span>
        <img src={LogoS7} alt="S7_logo" />
      </div>
      <div className={styles.space}>
        {segments.map((segment, index) => (
          <div key={index}>
            <TicketData
              origin={segment.origin}
              destination={segment.destination}
              date={segment.date}
              stops={segment.stops}
              duration={segment.duration}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
