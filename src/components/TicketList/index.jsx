import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, handleLoadMore } from "../../redux/slices/ticketSlice";
import styles from "./TicketList.module.scss";
import Ticket from "./Ticket";
import { filterAndSortTickets } from "../../redux/sort";
import { Spin, Alert } from "antd";
import { fetchSearchId } from "../../redux/slices/sessionIdSlice";

const TicketList = () => {
  const dispatch = useDispatch();

  const { tickets, stop, filters, sorting, status, error, numberOfTickets } =
    useSelector((state) => state.ticketsReducer);
  // console.log(tickets);
  const { sessionId } = useSelector((state) => state.sessionIdReducer);
  const [filteredAndSortedTickets, setFilteredAndSortedTickets] = useState([]);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchTickets(sessionId));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (status === "failed" && !stop) {
      dispatch(fetchTickets(sessionId));
    }
  }, [status, stop]);

  useEffect(() => {
    if (tickets.length > 0) {
      const updatedTickets = filterAndSortTickets(tickets, filters, sorting);
      setFilteredAndSortedTickets(updatedTickets);
    }
  }, [tickets, filters, sorting]);

  return (
    <>
      <h1>{stop.toString()}</h1>
      <h1>{status}</h1>
      {status === "loading" && <Spin className={styles.spin} size="large" />}
      {error && status === "failed" && <Alert message={error} type="error" />}
      <ul className={styles.ticketList}>
        {/* <h1>{searchId}</h1>
      <h1>{stop.toString()}</h1> */}
        {/* <button onClick={() => console.log(tickets)}>tickets</button> */}
        {filteredAndSortedTickets
          .slice(0, numberOfTickets)
          .map((ticket, index) => (
            <li key={index} className={styles.listItem}>
              <Ticket {...ticket} />
            </li>
          ))}
        {/* {stop ? (
        <button className={styles.showMore}>ВСЕ БИЛЕТЫ ЗАГРУЖЕНЫ</button>
      ) : (
        <button className={styles.showMore} onClick={handleLoadMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )} */}
        {/* <button className={styles.showMore} onClick={handleLoadMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button> */}
        <button
          className={styles.showMore}
          onClick={() => dispatch(handleLoadMore())}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      </ul>
    </>
  );
};

export default TicketList;
