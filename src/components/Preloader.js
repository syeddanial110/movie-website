import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import newLogo from "../assets/img/newLogo.png";

export default (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={newLogo}
        height={40}
      />
    </div>
  );
};
