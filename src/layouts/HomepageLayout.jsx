import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
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
