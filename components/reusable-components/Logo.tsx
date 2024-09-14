import React from "react";
import logo from "../../assets/images/logo.png";
export const Logo: React.FC<any> = ({ h, w }) => {
  return <img src={logo} alt="logo" height={h} width={w} />;
};
