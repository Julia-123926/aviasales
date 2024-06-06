/* eslint-disable prettier/prettier */
import React from "react";
import { useDispatch } from "react-redux";
import { Radio } from "antd";

import { setSorting } from "../../redux/slices/ticketSlice";

import styles from "./FilterTabs.module.scss";

const FilterTabs = () => {
  const dispatch = useDispatch();
  const tabs = ["САМЫЙ ДЕШЕВЫЙ", "САМЫЙ БЫСТРЫЙ", "ОПТИМАЛЬНЫЙ"];
  const handleTabChange = (e) => {
    dispatch(setSorting({ tab: e.target.value }));
  };
  return (
    <Radio.Group defaultValue="САМЫЙ ДЕШЕВЫЙ" buttonStyle="solid" className={styles.tabs} onChange={handleTabChange}>
      {tabs.map((tab) => (
        <Radio.Button className={styles.tabsItem} key={tab} value={tab}>
          {tab}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default FilterTabs;
