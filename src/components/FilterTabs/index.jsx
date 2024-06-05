import React, { useState } from "react";
import styles from "./FilterTabs.module.scss";
import { useDispatch } from "react-redux";
import { setSorting } from "../../redux/slices/ticketSlice";
import { Radio } from "antd";

const FilterTabs = () => {
  const dispatch = useDispatch();
  const tabs = ["САМЫЙ ДЕШЕВЫЙ", "САМЫЙ БЫСТРЫЙ", "ОПТИМАЛЬНЫЙ"];
  const handleTabChange = (e) => {
    dispatch(setSorting({ tab: e.target.value }));
  };
  return (
    <Radio.Group
      defaultValue="САМЫЙ ДЕШЕВЫЙ"
      buttonStyle="solid"
      className={styles.tabs}
      onChange={handleTabChange}
    >
      {tabs.map((tab) => (
        <Radio.Button className={styles.tabsItem} key={tab} value={tab}>
          {tab}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default FilterTabs;
