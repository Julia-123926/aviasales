import React from "react";
import styles from "./FilterTabs.module.scss";

const FilterTabs = () => {
  const tabs = ["Самый дешевый", "Самый быстрый", "Оптимальный"];
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button className={styles.tabsItem}>{tab.toUpperCase()}</button>
      ))}
    </div>
  );
};

export default FilterTabs;
