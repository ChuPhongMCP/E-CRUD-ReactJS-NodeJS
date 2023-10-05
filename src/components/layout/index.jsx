import Footer from "components/footer";
import Header from "components/header";
import React, { memo } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default memo(Layout);
