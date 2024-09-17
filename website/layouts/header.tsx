/* eslint-disable prettier/prettier */
import { useEffect } from "react";

import Hero from "@/components/home/hero";
import Navbarr from "@/components/home/navbarr";

const Header = () => {
  useEffect(() => {
    localStorage.removeItem('isAuthenticated');
  })

  return (
    <>
      <Hero />
      <Navbarr />
    </>
  );
};

export default Header;
