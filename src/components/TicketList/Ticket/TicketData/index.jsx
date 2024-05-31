import React from "react";
import styles from "./TicketData.module.scss";
import { addMinutes, format, parseISO } from "date-fns";

const TicketData = ({ origin, destination, date, stops, duration }) => {
  const calculateArrivalDate = (date, duration) => {
    const departureDate = parseISO(date);
    const arrivalDate = addMinutes(departureDate, duration);
    return arrivalDate;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <span className={styles.filterName}>
          {origin} – {destination}
        </span>
        <span className={styles.filterValue}>
          {format(parseISO(date), "HH:mm")} -{" "}
          {format(calculateArrivalDate(date, duration), "HH:mm")}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.filterName}>В ПУТИ</span>
        <span className={styles.filterValue}>
          {Math.floor(duration / 60)}ч {duration % 60}м
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.filterName}>
          {stops.length === 0
            ? "БЕЗ ПЕРЕСАДОК"
            : stops.length === 1
            ? "1 ПЕРЕСАДКА"
            : stops.length > 1 && `${stops.length} ПЕРЕСАДКИ`}
        </span>
        <span className={styles.filterValue}>{stops.join(", ")}</span>
      </div>
    </div>
  );
};

export default TicketData;
