import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/footer";
import { createGlobalStyle } from "styled-components";
import ColumnNewRedux from "../../components/ColumnNewRedux";
import * as selectors from "../../../store/selectors";
import { fetchHotCollections } from "../../../store/actions/thunks";
import api from "../../../core/api";
import {
  getUserNFT,
  getUserNFTOnSell,
} from "../../../store/actions/thunks/NFT";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: rgb(4, 17, 243) ;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Collection = function ({ collectionId = 1 }) {
  const [openMenu, setOpenMenu] = React.useState(true);

  const [openMenu1, setOpenMenu1] = React.useState(false);

  const signedInUser = useSelector((e) => e.auth.signedInUser);

  const [userId, setUserId] = useState(false)

  useEffect(() => {
    let url = new URL(window.location)
    let params = url.searchParams.get('u')
    if (params === 'me') {
      setUserId(signedInUser._id)
    } else {
      setUserId(params)
    }
  }, [signedInUser])


  const getUserNftSell = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    if (userId) {
      dispatch(getUserNFTOnSell(userId));
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserNFTOnSell(userId));
    }
  }, [userId])

  const ownedNfts = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    if (userId) {
      dispatch(getUserNFT(userId));
    }
  };

  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data
    ? hotCollectionsState.data[0]
    : {};

  useEffect(() => {
    dispatch(fetchHotCollections(collectionId));
  }, [dispatch, collectionId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const xumm = useSelector((e) => e.auth);
  const walletAccount = useSelector((e) => e.auth.walletAccount);







  return (
    <div>
      <GlobalStyles />
      {hotCollections.author && hotCollections.author.banner && (
        <div className="profile_bannerDiv">
          <section
            id="profile_banner"
            className="jumbotron breadcumb no-bg"
            style={{
              backgroundImage: `url(${signedInUser.profile_banner})`,
            }}
          >
            <div className="mainbreadcumb"></div>
          </section>
        </div>
      )}

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                {hotCollections.author && hotCollections.author.avatar && (
                  <div className="d_profile_img">
                    <img src={signedInUser.profile} alt="" />
                    <i className="fa fa-check"></i>
                  </div>
                )}
                <div className="profile_name">
                  <h4>
                    {signedInUser.first_name + " " + signedInUser.last_name}
                    <div className="clearfix"></div>
                    {walletAccount && walletAccount && (
                      <span id="wallet" className="profile_wallet">
                        {walletAccount}
                      </span>
                    )}
                    <button id="btn_copy" title="Copy Text">
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={getUserNftSell}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={ownedNfts}>Owned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux
              shuffle
              showLoadMore={false}
              authorId={hotCollections.author ? hotCollections.author.id : 1}
            />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};
export default memo(Collection);
