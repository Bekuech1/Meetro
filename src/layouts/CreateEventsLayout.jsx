// import Header from '@/components/home/Header'
import Header from "@/components/home/HomeNav";
import Footer from "@/components/Layout-conponents/Footer";
import { Outlet } from "react-router";

const CreateEventsLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default CreateEventsLayout;
