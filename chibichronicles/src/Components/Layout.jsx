import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

const Layout = ({ setModalOpen }) => {
  return (
    <>
      <Navbar setModalOpen={setModalOpen} />
      <Outlet /> {/* Render matched child routes here */}
    </>
  );
};

export default Layout;