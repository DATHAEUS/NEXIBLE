import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from '../../core/auth';
import logo from './../../assets/Images/Nexible.png'
import { useDispatch, useSelector } from "react-redux";
import { getBalanceXumm, logOut } from "../../store/actions/thunks/auth";
import XummWalletModal from "../Pages/Auth/XummWalletModal";
import blankProfile from './../../assets/Images/blank-profile.webp'
import NavDrawer from "./NavDrawer";


setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={match ? 'active' : 'non-active'}
    />
  )
};



const Header = function ({ className }) {

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const signedInUser = useSelector(e => e.auth.signedInUser)
  const [signedInUserState, setSignedInUser] = useState(false)

  useEffect(() => {
    setSignedInUser(signedInUser)
  }, [signedInUser])
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });


  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });
  let dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logOut());
    // navigate('/')
  }

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      }
      else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      // if (window.pageYOffset > sticky) {
      //   closeMenu();
      // }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  const [show, setShow] = useState(false);
  const xummBalance = useSelector(e => e.auth.xummBalance)
  const walletAccount = useSelector(e => e.auth.walletAccount)


  const handleClose = () => setShow(false);
  const handleShow = () => {
   console.log('runnnn')
    setShow(true)
  };

  useEffect(() => {
    if(walletAccount){
      dispatch(getBalanceXumm(walletAccount))
    }
  }, [walletAccount])
  useEffect(()=>{
    console.log(xummBalance,'xummBalance')

  },[xummBalance])
  return (
    <>
      <header className={`navbar  ${className}`} id="myHeader">
        <div className=''>
          <div className='row w-100-nav'>
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

            <div className='search'>
              <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
            </div>

            <BreakpointProvider>
              <Breakpoint l down>
                {showmenu &&
                  <div className='menu'>
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
                      <NavLink to="/Blogs">
                       Blogs
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
                    {signedInUser ?
                      <div className='navbar-item'>
                        <NavLink to="/Profile">
                          Profile
                          <span className='lines'></span>
                        </NavLink>
                      </div>
                      : null}

                    <div className="navbar-item navWallet">
                      {!signedInUserState ?
                        <div className='mainside'>
                          <div className='loginButton'>
                            <p className="LoginButtonText"><NavLink to="/Login">Login</NavLink></p>
                          </div>

                        </div>
                        : null}
                      < div className='mainside'>
                        <XummWalletModal show={show}
                          setShow={setShow}
                          handleClose={handleClose}
                          handleShow={handleShow}
                          connectButonHide={walletAccount ? true : false}
                        />


                      </div>
                      {/* <div className="navbar-item"> */}
                      {/* <button onClick={
                        dispatch(getBalanceXumm(accountAddress))
                      }>
                        checkBalance
                      </button> */}
                      {/* {xummBalance} */}
                      {/* </div> */}
                      {signedInUserState ?
                        <>
                          <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                            <div className="d-count">8</div>
                            <i className="fa fa-bell"></i>
                            {shownot &&
                              <div className="popshow">
                                <div className="de-flex">
                                  <h4>Notifications</h4>
                                  <span className="viewaall">Show all</span>
                                </div>
                                <ul>
                                  <li>
                                    <div className="mainnot">
                                      <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                                      <div className="d-desc">
                                        <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                                        <span className="d-time">1 hour ago</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="mainnot">
                                      <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                                      <div className="d-desc">
                                        <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                                        <span className="d-time">2 hours ago</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="mainnot">
                                      <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                                      <div className="d-desc">
                                        <span className="d-name"><b>Lori Hart</b> started following you</span>
                                        <span className="d-time">18 hours ago</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="mainnot">
                                      <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                                      <div className="d-desc">
                                        <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                                        <span className="d-time">1 day ago</span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="mainnot">
                                      <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                                      <div className="d-desc">
                                        <span className="d-name"><b>Karla Sharp</b> started following you</span>
                                        <span className="d-time">3 days ago</span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            }
                          </div>
                          <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                            <img src={signedInUserState.profile ? signedInUserState.profile : blankProfile} alt="" />
                            {showpop &&
                              <div className="popshow">
                                <div className="d-name">
                                  <h4>{signedInUser.first_name} {signedInUser.last_name}</h4>
                                  <span className="name" onClick={() => window.open("", "_self")}>Set display name</span>
                                </div>
                                <div className="d-balance">
                                  <h4>Balance</h4>
                                  12.858 ETH
                                </div>
                                <div className="d-wallet">
                                  <h4>My Wallet</h4>
                                  <span id="wallet" className="d-wallet-address">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                                  <button id="btn_copy" title="Copy Text">Copy</button>
                                </div>
                                <div className="d-line"></div>
                                <ul className="de-submenu-profile">

                                  <li>
                                    <span>
                                      <i className="fa fa-user"></i> My Collection
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
                            }
                          </div>
                        </>
                        : null}
                    </div>

                  </div>
                }
              </Breakpoint>

              <Breakpoint xl>
                <div className='menu'>
                  <div className='navbar-item'>
                    <NavLink to="/Home">
                      Home
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/Explore">
                      Explore
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                      <NavLink to="/Blogs">
                       Blogs
                      </NavLink>
                    </div>
                  <div className='navbar-item'>
                    <NavLink to="/CreateOptions">
                      Create
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/wallet">
                      Wallet
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/add-Info">
                      Pricing
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                  {signedInUser ?
                    <div className='navbar-item'>
                      <NavLink to="/Profile">
                        Profile
                        <span className='lines'></span>
                      </NavLink>
                    </div>
                    : null}
                  {/* {signedInUser ?
                  null
                  :
                  < div className='navbar-item'>
                    <div className='loginButton'>
                      <div className='LoginButtonText'>
                        <NavLink to="/Login">Login</NavLink>
                      </div>
                    </div>
                  </div>
                } */}
                  <div className='navbar-item'>

                  </div>

                  <div className="navbar-item">
                    {!signedInUserState ?
                      <div className='mainside'>
                        <div className='loginButton'>
                          <p className="LoginButtonText"><NavLink to="/Login">Login</NavLink></p>
                        </div>

                      </div>
                      : null}
                    < div className='mainside'>
                      <XummWalletModal show={show}
                        setShow={setShow}
                        handleClose={handleClose}
                        handleShow={handleShow}
                        connectButonHide={walletAccount ? true : false}
                      />


                    </div>
                 
                    {signedInUserState ?
                      <>
                        <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                          <div className="d-count">8</div>
                          <i className="fa fa-bell"></i>
                          {shownot &&
                            <div className="popshow">
                              <div className="de-flex">
                                <h4>Notifications</h4>
                                <span className="viewaall">Show all</span>
                              </div>
                              <ul>
                                <li>
                                  <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                                    <div className="d-desc">
                                      <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                                      <span className="d-time">1 hour ago</span>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                                    <div className="d-desc">
                                      <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                                      <span className="d-time">2 hours ago</span>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                                    <div className="d-desc">
                                      <span className="d-name"><b>Lori Hart</b> started following you</span>
                                      <span className="d-time">18 hours ago</span>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                                    <div className="d-desc">
                                      <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                                      <span className="d-time">1 day ago</span>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="mainnot">
                                    <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                                    <div className="d-desc">
                                      <span className="d-name"><b>Karla Sharp</b> started following you</span>
                                      <span className="d-time">3 days ago</span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          }
                        </div>
                        <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>
                          <img src={signedInUserState.profile} alt="" />
                          {showpop &&
                            <div className="popshow">
                              <div className="d-name">
                                <h4>{signedInUser.first_name} {signedInUser.last_name}</h4>
                                <span className="name" onClick={() => window.open("", "_self")}>Set display name</span>
                              </div>
                              <div className="d-balance">
                                <h4>Balance</h4>
                                {xummBalance} XRP
                              </div>
                              <div className="d-wallet">
                                <h4>My Wallet</h4>
                                <span id="wallet" className="d-wallet-address">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                                <button id="btn_copy" title="Copy Text">Copy</button>
                              </div>
                              <div className="d-line"></div>
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
                          }
                        </div>
                      </>
                      : null}
                  </div>

                </div>
              </Breakpoint>
            </BreakpointProvider>


          </div>

          <button className="nav-icon  forPc" onClick={() => btn_icon(!showmenu)}>
            <div className="menu-line white"></div>
            <div className="menu-line1 white"></div>
            <div className="menu-line2 white"></div>
          </button>
          <NavDrawer
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleShow={handleShow}
            connectButonHide={walletAccount ? true : false}
            xummBalance={xummBalance} handleLogout={handleLogout} signedInUserState={signedInUser} />

        </div>
      </header >

    </>
  );
}
export default Header;