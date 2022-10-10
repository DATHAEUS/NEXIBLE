import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  withRouter,
} from "react-router-dom";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home from "./Pages/home";
import Explore from "./Pages/Explore/explore";
import HelpCenter from "./Pages/HelpCenter";
import Collection from "./Pages/Explore/collection";
import NFTDetail from "./Pages/Explore/NFTDetail";
import Author from "./Pages/Auth/Author";
import Wallet from "./Pages/Auth/wallet";
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/register";
import CreateSingleNFT from "./Pages/Create/CreateSingleNFT";
import CreateMultipleNFT from "./Pages/Create/CreateMultipleNFT";
import CreateOption from "./Pages/Create/index";
import Profile from "./Pages/Auth/Profile";
import auth from "../core/auth";
import "./../assets/style.scss";
import { createGlobalStyle } from "styled-components";
import Logintwo from "./pages Default/loginTwo";
import { getAccountId, signedIn } from "../store/actions/thunks/auth";
import { useDispatch, useSelector } from "react-redux";
import XummExample from "./Pages/Auth/XummWallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import "antd/dist/antd.css";
import SingleBlog from "./Pages/SingleBlog";
import Blogs from "./Pages/Blogs";
import CreateWallet from "./Pages/Auth/CreateWallet";
const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = auth.getToken() !== null;

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  let location = useLocation();
  const [loading, setLoading] = useState(false);
  const signedInUser = useSelector((e) => e.auth.signedInUser);
  let dispatch = useDispatch();
  useEffect(() => {
    console.log(location.pathname);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location]);

  useEffect(() => {
    dispatch(signedIn());
    dispatch(getAccountId());
  }, []);
  useEffect(() => {
    console.log(signedInUser);
  }, [signedInUser]);

  return (
    <>
      <div
        className="preloader"
        style={{ display: `${loading ? "block" : "none"}` }}
      >
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="wraper">
        <GlobalStyles />
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="*" element={<Navigate to="/Home" replace />} />
          <Route element={<Home />} path="/Home" />
          <Route path="/Author">
            <Route
              path=":authorId"
              element={
                // <ProtectedRoute>
                <Author />
                // </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<Profile />} path="/Profile" />
          <Route element={<Explore />} path="/Explore" />
          <Route element={<HelpCenter />} path="/HelpCenter" />
          <Route element={<Collection />} path="/Collection/User" />
          <Route element={<NFTDetail />} path="/ItemDetail/:nftId" />
          <Route element={<Wallet />} path="/wallet" />
          <Route element={<Blogs />} path="/Blogs" />
          <Route element={<SingleBlog />} path="/Blog-Details" />
          {/* <Route element={<Login />} path="/login" /> */}
          <Route element={<Register />} path="/register" />
          <Route element={<CreateOption />} path="/CreateOptions" />
          <Route element={<CreateSingleNFT />} path="/CreateSingleNFT" />
          <Route element={<CreateMultipleNFT />} path="/CreateMultipleNFT" />
          <Route element={<Logintwo />} path="/Login" />
          <Route element={<CreateWallet />} path="/add-Info" />
          
          {/* <Route element={<XummExample />} path="/XummExample" /> */}
        </Routes>
        <ScrollToTopBtn />
        {/* <div className="preloader" >
      <div className="preloader-inner">
        <div className="preloader-icon">
          <span></span>
          <span></span>
        </div>
      </div>
    </div> */}
      </div>
    </>
  );
};
export default App;
