import React from "react";

import LogoPlane from "../../assets/LogoPlane.svg";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.logo}>
      <img alt="planeLogo" src={LogoPlane} />
    </header>
  );
};

export default Header;
