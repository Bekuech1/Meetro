import Header from '@/components/home/Header'
import Footer from '@/components/Layout-conponents/Footer'
import { Outlet } from 'react-router'

const CreateEventsLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default CreateEventsLayout