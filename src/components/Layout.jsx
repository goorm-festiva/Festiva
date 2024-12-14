import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";


const Layout = ({ user }) => {
  
  return (
    <>
      {/* Nav에 user 전달, 추가 */}
      <Nav user={user} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
