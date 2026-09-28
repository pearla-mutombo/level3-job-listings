import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header title="ViaNova" />
      <Outlet />
    </>
  );
}

export default Layout;
