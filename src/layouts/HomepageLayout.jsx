import Header from "@/components/home/HomeNav";
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
