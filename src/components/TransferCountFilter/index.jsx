import React from "react";
import styles from "./TransferCountFilter.module.scss";

const TransferCountFilter = () => {
  const filtersList = [
    "Все",
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];
  return (
    <aside className={styles.aside}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Количество пересадок</span>
        <ul className={styles.list}>
          {filtersList.map((filter, index) => (
            <li>
              <label htmlFor={index}>
                <div className={styles.listElement}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={index}
                  />
                  <span className={styles.text}>{filter}</span>
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
