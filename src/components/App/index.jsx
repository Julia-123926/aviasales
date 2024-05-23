import React from "react";
// import { useSelector, useDispatch } from "react-redux";

//useSelector похож на useContext
import Header from "../Header";
import styles from "./App.module.scss";
import TransferCountFilter from "../TransferCountFilter";
import FilterTabs from "../FilterTabs";
import TicketList from "../TicketList";

function App() {
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
}

export default App;
