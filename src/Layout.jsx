import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
// import Header from './Header'

const Layout = () => {
  return (
    <>
    <div className='py-4 px-8 flex flex-col min-h-screen max-w-8xl mx-auto'>
        {/* <Header />  */}
        <Outlet />
        
    </div>
    <Footer />
    </>
  )
}

export default Layout