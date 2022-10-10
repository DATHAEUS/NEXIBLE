import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import XummWalletModal from '../Pages/Auth/XummWalletModal';
import logo from './../../assets/Images/Nexible.png'
const NavDrawer = ({ handleLogout, signedInUserState, xummBalance, show,
    setShow,
    handleClose,
    handleShow,
    walletAccount }) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <button className="nav-icon  forMob" onClick={showDrawer}>
                <div className="menu-line white"></div>
                <div className="menu-line1 white"></div>
                <div className="menu-line2 white"></div>
            </button>
            <Drawer className='navbarDrawer' placement="left" onClose={onClose} visible={visible}>
                <div className='logo px-0'>
                    <div className='navbar-title navbar-item'>
                        <NavLink to="/">
                            {/* <img
                  src="/img/logo.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img
                  src="/img/logo-2.png"
                  className="img-fluid d-3"
                  alt="#"
                />
                <img
                  src="/img/logo-3.png"
                  className="img-fluid d-4"
                  alt="#"
                />
                <img
                  src="/img/logo-light.png"
                  className="img-fluid d-none"
                  alt="#"
                /> */}
                            <h2 style={{ fontWeight: "500" }}><img className="logoNavbar" src={logo} /></h2>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <div className='navbar-item'>
                        <NavLink to="/Home">
                            Home
                        </NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink to="/Explore">
                            Explore
                        </NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink to="/CreateOptions">
                            Create
                        </NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink to="/wallet">
                            Wallet
                        </NavLink>
                    </div>
                    <div className='navbar-item'>
                        <NavLink to="/HelpCenter">
                            Help Center
                        </NavLink>
                    </div>
                    {!signedInUserState ?
                        <div className='navbar-item'>
                            <NavLink to="/Login">Login</NavLink>
                        </div>
                        : null}
                </div>
                {signedInUserState ?

                    <div className='profileSection'>
                        <div className='avDetail'>
                            <img src={signedInUserState.profile} />
                            <div>
                                <p><b>Name:</b>{signedInUserState.first_name} {signedInUserState.last_name}</p>
                                <p><b>Balance:</b>{xummBalance} XRP</p>
                            </div>
                        </div>
                        <ul className="de-submenu-profile">

                            <li>
                                <span>
                                    <NavLink to='/Collection/User?u=me'>
                                        <i className="fa fa-user"></i> My Collection
                                    </NavLink>
                                </span>
                            </li>

                            <li>
                                <span>
                                    <i className="fa fa-user"></i> My profile
                                </span>
                            </li>
                            <li>
                                <span>
                                    <NavLink to='/Profile'>
                                        <i className="fa fa-pencil"></i> Edit profile
                                    </NavLink>
                                </span>
                            </li>
                            <li onClick={handleLogout}>
                                <span>
                                    <i className="fa fa-sign-out"></i> Sign out
                                </span>
                            </li>
                        </ul>
                    </div>
                    : null}


               
                <XummWalletModal show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
                connectButonHide={walletAccount}
                navButton={true}
            />
            </Drawer>
      
        </>
    );
};

export default NavDrawer;