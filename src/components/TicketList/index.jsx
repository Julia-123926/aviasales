/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import { v4 as id } from "uuid";

import { fetchTickets, handleLoadMore } from "../../redux/slices/ticketSlice";
import filterAndSortTickets from "../../redux/sort";
import { fetchSearchId } from "../../redux/slices/sessionIdSlice";

import styles from "./TicketList.module.scss";
import Ticket from "./Ticket";

const TicketList = () => {
  const dispatch = useDispatch();

  const { tickets, stop, filters, sorting, status, numberOfTickets } = useSelector((state) => state.ticketsReducer);
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
      {status === "loading" && <Spin className={styles.spin} size="large" />}
      {filteredAndSortedTickets.length === 0 && (
        <Alert
          message={
            status === "failed"
              ? "Не удалось получить билеты, повторите попытку позже"
              : "К сожалению, билетов, подходящих под заданные параметры, не найдено"
          }
          type="info"
        />
      )}
      {}
      <ul className={styles.ticketList}>
        {filteredAndSortedTickets.slice(0, numberOfTickets).map((ticket) => (
          <li key={id()} className={styles.listItem}>
            <Ticket {...ticket} />
          </li>
        ))}
        {filteredAndSortedTickets.length - numberOfTickets > 0 && (
          <button className={styles.showMore} onClick={() => dispatch(handleLoadMore())}>
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        )}
      </ul>
    </>
  );
};

export default TicketList;
