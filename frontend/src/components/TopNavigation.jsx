import React from 'react';
import { FaBars } from 'react-icons/fa';

function TopNavigation() {
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand ps-3" href="/dashboard">
          Aplikasi Child Tracker
        </a>
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={() => document.body.classList.toggle('sb-sidenav-toggled')}
        >
          <FaBars />
        </button>
        <form className="d-none d-md-inline-block ms-auto me-0 me-md-3 my-2 my-md-0"></form>
      </nav>
    </>
  );
}

export default TopNavigation;
