import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleAll, toggleFilter } from "../../redux/slices/ticketSlice";

import styles from "./TransferCountFilter.module.scss";

const TransferCountFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.ticketsReducer.filters);

  const handleToggleAll = () => {
    dispatch(toggleAll(!filters.all));
  };

  const handleToggleFilter = (filterName) => {
    dispatch(toggleFilter({ filterName, value: !filters[filterName] }));
  };

  const filtersList = [
    { key: "all", value: "Все" },
    { key: "noStops", value: "Без пересадок" },
    { key: "oneStop", value: "1 пересадка" },
    { key: "twoStops", value: "2 пересадки" },
    { key: "threeStops", value: "3 пересадки" },
  ];

  return (
    <aside className={styles.aside}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Количество пересадок</span>
        <ul className={styles.list}>
          {filtersList.map((filter) => (
            <li key={filter.key}>
              <label htmlFor={filter.key}>
                <div className={styles.listElement}>
                  <input
                    onChange={() => (filter.key === "all" ? handleToggleAll() : handleToggleFilter(filter.key))}
                    className={styles.checkbox}
                    checked={filters[filter.key]}
                    type="checkbox"
                    id={filter.key}
                  />
                  <span className={styles.customCheckbox}></span>
                  <span className={styles.text}>{filter.value}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TransferCountFilter;
