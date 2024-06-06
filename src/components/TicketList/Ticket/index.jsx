import React from "react";
import { v4 as id } from "uuid";

import TicketData from "./TicketData";
import styles from "./Ticket.module.scss";

const Ticket = ({ price, segments, carrier }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ticketTop}>
        <span className={styles.ticketPrice}>{price} P</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>
      <div className={styles.space}>
        {segments.map((segment) => (
          <div key={id()}>
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
