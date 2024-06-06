import React from "react";

import Header from "../Header";
import TransferCountFilter from "../TransferCountFilter";
import FilterTabs from "../FilterTabs";
import TicketList from "../TicketList";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <TransferCountFilter />
        <div className={styles.wrapper}>
          <FilterTabs />
          <TicketList />
        </div>
      </main>
    </div>
  );
};

export default App;
