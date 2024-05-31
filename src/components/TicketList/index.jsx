import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchId, fetchTickets } from "../../redux/slices/ticketSlice";
import styles from "./TicketList.module.scss";
import Ticket from "./Ticket";

const TicketList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticketsReducer.tickets);
  const searchId = useSelector((state) => state.ticketsReducer.searchId);
  const stop = useSelector((state) => state.ticketsReducer.stop);
  // const status = useSelector((state) => state.ticketsReducer.status);

  const [visibleTickets, setVisibleTickets] = useState(5);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      // while (!stop) {
      dispatch(fetchTickets(searchId));
      // }
    }
  }, [dispatch, searchId, stop]);

  useEffect(() => {}, [visibleTickets]);

  const handleLoadMore = () => {
    setVisibleTickets((prev) => prev + 5);
  };
  return (
    <ul className={styles.ticketList}>
      {/* <h1>{searchId}</h1>
      <h1>{stop.toString()}</h1> */}
      {/* <button onClick={() => console.log(tickets)}>tickets</button> */}
      {tickets.slice(0, visibleTickets).map((ticket, index) => (
        <li key={index} className={styles.listItem}>
          <Ticket {...ticket} />
        </li>
      ))}
      {stop ? (
        <button className={styles.showMore}>ВСЕ БИЛЕТЫ ЗАГРУЖЕНЫ</button>
      ) : (
        <button className={styles.showMore} onClick={handleLoadMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </ul>
  );
};

export default TicketList;
