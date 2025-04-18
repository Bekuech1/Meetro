import Header from "@/components/home/header";
import Footer from "@/components/Layout-conponents/Footer";
import { Outlet } from "react-router-dom";

function HomepageLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomepageLayout;
