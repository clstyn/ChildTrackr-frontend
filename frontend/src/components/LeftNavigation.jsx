import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';

function LeftNavigation({ setShowModal, roleTitle }) {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            {roleTitle === 'Parent' ? (
              <NavLink to="/parent/home" className="nav-link">
                <div className="sb-nav-link-icon">
                  <FaHome />
                </div>
                Home
              </NavLink>
            ) : (
              <NavLink to="/child/home" className="nav-link">
                <div className="sb-nav-link-icon">
                  <FaHome />
                </div>
                Home
              </NavLink>
            )}
            {roleTitle === 'Parent' && (
              <>
                <NavLink to="/parent/history" className="nav-link">
                  <div className="sb-nav-link-icon">
                    <FaHistory />
                  </div>
                  History
                </NavLink>
              </>
            )}
            <div className="sb-sidenav-menu-heading">Settings</div>
            <a className="nav-link">
              <div className="sb-nav-link-icon">
                <FaSignOutAlt />
              </div>
              <button onClick={() => setShowModal({ show: true })} className="btn-logout">
                Logout
              </button>
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {localStorage.getItem('username')}
        </div>
      </nav>
    </div>
  );
}

export default LeftNavigation;
