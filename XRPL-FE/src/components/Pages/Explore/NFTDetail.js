import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Clock from "../../components/Clock";
import Footer from "../../components/footer";
import { createGlobalStyle } from "styled-components";
import * as selectors from "../../../store/selectors";
import { fetchNftDetail } from "../../../store/actions/thunks";
/*import Checkout from "../components/Checkout";
import Checkoutbid from "../components/Checkoutbid";*/
import api from "../../../core/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  buyNft,
  getSingleNft,
  sellNft,
} from "../../../store/actions/thunks/NFT";
import { io } from "socket.io-client";
import XummWalletModal from "../Auth/XummWalletModal";
import background from "./subheader.jpg";
import { toast } from "react-toastify";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  .mr40{
    margin-right: 40px;
  }
  .mr15{
    margin-right: 15px;
  }
  .btn2{
    background: #f6f6f6;
    color: rgb(4, 17, 243) !important;
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

const NFTDetail = ({ nftId }) => {
  const [openMenu0, setOpenMenu0] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);

  const handleBtnClick0 = () => {
    setOpenMenu0(!openMenu0);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn0").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu0(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn0").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    setOpenMenu0(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn0").classList.remove("active");
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data ? nftDetailState.data : [];
  let navigate = useNavigate();
  const singleNft = useSelector((e) => e.NFTData.singleNft);
  const sellOfferLoader = useSelector((e) => e.NFTData.sellOfferLoader);

  const user = useSelector((e) => e.auth.signedInUser);
  const sellQr = useSelector((e) => e.NFTData.sellQr);
  const sellLink = useSelector((e) => e.NFTData.sellLink);
  const buyQr = useSelector((e) => e.NFTData.buyQr);
  const buyLink = useSelector((e) => e.NFTData.buyLink);
  const sellQrLoader = useSelector((e) => e.NFTData.sellQrLoader);
  const buyNftLoader = useSelector((e) => e.NFTData.buyNftLoader);
  const acceptNftLoader = useSelector((e) => e.NFTData.acceptNftLoader);

  const [openCheckout, setOpenCheckout] = React.useState(false);
  const [openCheckoutbid, setOpenCheckoutbid] = React.useState(false);
  const [nftObj, setNftObj] = React.useState(false);
  const [dataObject, setDataObject] = React.useState(false);
  const [socketId, setSocketId] = React.useState("");
  const [result, setResult] = React.useState(false);
  const [showQr, setShowQr] = React.useState(false);
  const [showBuyQr, setBuyShowQr] = React.useState(false);
  const [buyResult, setBuyResult] = React.useState(false);

  var nftId = window.location.pathname.split("Detail/")[1];
  useEffect(() => {
    console.log(singleNft);
    setNftObj(singleNft);
  }, [singleNft]);
  useEffect(() => {
    if (nftId) {
      //   console.log(nftId);
      dispatch(getSingleNft(nftId, navigate));
    } else {
      console.log("can't target pathname without split -> Detail/ ");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchNftDetail(nftId));
  }, [dispatch, nftId]);

  useEffect(() => {
    if (sellQr) {
      setShowQr(!showQr);
      setResult(false);
    }
  }, [sellQr]);
  useEffect(() => {
    if (buyQr) {
      setBuyShowQr(!showBuyQr);
      setBuyResult(false);
    }
  }, [buyQr]);
  useEffect(() => {
    setShowQr(false);
    setBuyShowQr(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // const socket = io(baseURL);
    const socket = io("https://xrpl-xumm.herokuapp.com");

    socket.on("connect", function (data) {
      console.log("connected", socket.id);
      setSocketId(socket.id);
      // console.log(socket.id);
    });
    socket.on("createOffer", (data) => {
      console.log(data, "runnnnnnnnnn");
      //   console.log(data,'');
    });
    socket.on("createOfferResult", (data) => {
      console.log("createOfferResult");
      if (data.nft) {
        console.log("createOfferResult", data);
        setResult(true);
        setShowQr(!showQr);
        dispatch(getSingleNft(nftId, navigate));
        console.log(data, "runnnnnnnnnn");
      }
    });

    socket.on("acceptOffer", (data) => {
      console.log(data, "runnnnnnnnnn");
      //   console.log(data,'');
    });
    socket.on("acceptOfferResult", (data) => {
      if (data.nft) {
        console.log("acceptOfferResult", data);
        setBuyResult(true);
        setBuyShowQr(!showQr);
        dispatch(getSingleNft(nftId, navigate));
        console.log(data, "runnnnnnnnnn");
      }
    });
    socket.on("disconnect", function (message) {
      console.log("Socket disconnected from server: ", message);
    });

    return () => {
      socket.close();
    };
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   // const socket = io(baseURL);
  //   const socket = io("https://xrpl-xumm.herokuapp.com");

  //   socket.on("connect", function (data) {
  //     console.log("connected", socket.id);
  //     setSocketId(socket.id);
  //     // console.log(socket.id);
  //   });

  //   socket.on("disconnect", function (message) {
  //     console.log("Socket disconnected from server: ", message);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  //   // eslint-disable-next-line
  // }, []);

  const sellNftFunc = () => {
    console.log(dataObject);
    dispatch(sellNft(socketId, dataObject, nftObj, navigate));
  };
  const buyNftFunc = () => {
    console.log("dataObject", nftObj);
    dispatch(buyNft(socketId, nftObj, navigate));
  };

  const [show, setShow] = useState(false);
  const xummBalance = useSelector((e) => e.auth.xummBalance);
  const walletAccount = useSelector((e) => e.auth.walletAccount);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (result) {
      setShowQr(false);
    }
    if (buyResult) {
      setBuyShowQr(false);
    }
  }, [result, buyResult]);

  useEffect(() => {
    console.log(buyNftLoader, "buyNftLoader");
  }, [buyNftLoader]);

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url('${background}')` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">NFT Detail</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              //   src={nft.preview_image && api.baseUrl + nft.preview_image.url}
              src={
                nftObj?.nft_img
                  ? nftObj?.nft_img
                  : "https://res.cloudinary.com/softsyncdev/image/upload/v1659708633/qprqugjanm4vchdrzgwl.png"
              }
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {nftObj?.item_type === "on_auction" && (
                <>
                  Auctions ends in
                  <div className="de_countdown">
                    <Clock deadline={nftObj?.deadline} />
                  </div>
                </>
              )}
              <h2>{nftObj?.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>
                  {nftObj?.category}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {nftObj?.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {nftObj?.likes}
                </div>
              </div>
              <p>{nftObj?.description}</p>

              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={
                            // nft.author && api.baseUrl + nft.author.avatar.url
                            nftObj?.created_by
                              ? nftObj?.created_by?.profile
                              : "https://i.pinimg.com/564x/68/3b/d8/683bd878731ab0e229b4f0f62e25ad58.jpg"
                          }
                          alt="createor"
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>{nftObj?.created_by?.username}</span>
                    </div>
                  </div>
                </div>
                <div className="mr40">
                  <h6>Collection</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={
                            // nft.author && api.baseUrl + nft.author.avatar.url
                            nftObj?.owner
                              ? nftObj?.owner?.profile
                              : "https://cdna.artstation.com/p/assets/images/images/047/979/718/large/smith-kenny-lion-legends-s1-4-768x768.jpg?1648911419"
                          }
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>{nftObj?.owner?.username}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spacer-40"></div>

              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn0" className="active">
                    <span onClick={handleBtnClick0}>Details</span>
                  </li>
                  <li id="Mainbtn">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {openMenu0 && (
                    <div className="tab-1 onStep fadeIn">
                      <div className="d-block mb-3">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <span
                                onClick={() =>
                                  navigate(`/Collection/User?u=${nftObj.owner}`)
                                }
                              >
                                {/* <span onClick={()=>console.log(nftObj)}> */}
                                <img
                                  className="lazy"
                                  src={
                                    // nft.author &&
                                    // api.baseUrl + nft.author.avatar.url
                                    nftObj?.owner
                                      ? nftObj?.owner?.profile
                                      : "https://pbs.twimg.com/media/FKdvJXSXMAMb6o6.jpg:large"
                                  }
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="author_list_info">
                              <span>{nftObj?.owner?.username}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-5">
                          {nftObj?.tags?.length ? (
                            nftObj?.tags?.map((tag, index) => (
                              <div
                                className="col-lg-4 col-md-6 col-sm-6"
                                key={index}
                              >
                                <div className="nft_attr">
                                  {/* <h5>Tag {index + 1}</h5> */}
                                  {/* <h5>{tag}</h5> */}
                                  <h4>{tag}</h4>
                                  <span>85% have this trait</span>
                                  {/* <h5>Background</h5>
                                  <h4>Yellowish Sky</h4>
                                  <span>85% have this trait</span> */}
                                </div>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Background</h5>
                                  <h4>Yellowish Sky</h4>
                                  <span>85% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Eyes</h5>
                                  <h4>Purple Eyes</h4>
                                  <span>14% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Nose</h5>
                                  <h4>Small Nose</h4>
                                  <span>45% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Mouth</h5>
                                  <h4>Smile Red Lip</h4>
                                  <span>61% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Neck</h5>
                                  <h4>Pink Ribbon</h4>
                                  <span>27% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Hair</h5>
                                  <h4>Pink Short</h4>
                                  <span>35% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Accessories</h5>
                                  <h4>Heart Necklace</h4>
                                  <span>33% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Hat</h5>
                                  <h4>Cute Panda</h4>
                                  <span>62% have this trait</span>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="nft_attr">
                                  <h5>Clothes</h5>
                                  <h4>Casual Purple</h4>
                                  <span>78% have this trait</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      {nft?.bids &&
                        nft?.bids.map((bid, index) => (
                          <div className="p_list" key={index}>
                            <div className="p_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src={api.baseUrl + bid.author.avatar.url}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="p_list_info">
                              Bid{" "}
                              {bid.author.id === nft?.author.id && "accepted"}{" "}
                              <b>{bid.value} ETH</b>
                              <span>
                                by <b>{bid.author.username}</b> at{" "}
                                {moment(bid.created_at).format("L, LT")}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      {nft?.history &&
                        nft?.history.map((bid, index) => (
                          <div className="p_list" key={index}>
                            <div className="p_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src={api.baseUrl + bid.author.avatar.url}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="p_list_info">
                              Bid{" "}
                              {bid.author.id === nft?.author.id && "accepted"}{" "}
                              <b>{bid.value} ETH</b>
                              <span>
                                by <b>{bid.author.username}</b> at{" "}
                                {moment(bid.created_at).format("L, LT")}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    {nftObj?.nftType === "mint" ? (
                      nftObj?.owner?._id === user._id ? (
                        <button
                          className="btn-main lead mb-5 mr15 disabled"
                          onClick={() => {
                            console.log("Sell NFT");
                            if (!user) {
                              navigate("/login");
                            }
                            setOpenCheckout(true);
                          }}
                        >
                          Sell NFT
                        </button>
                      ) : (
                        <button className="btn-main lead mb-5 mr15 disabled">
                          Not For Sell
                        </button>
                      )
                    ) : nftObj?.owner?._id === user._id ? (
                      // <button
                      //   className="btn-main lead mb-5 mr15 disabled"
                      //   onClick={() => {
                      //     console.log("You Own This Nft");
                      //     // setOpenCheckout(true);
                      //   }}
                      // >
                      //   You Own This Nft
                      // </button>
                      ""
                    ) : (
                      <button
                        className="btn-main lead mb-5 mr15 disabled"
                        onClick={() => {
                          console.log("Buy Now");
                          if (!walletAccount) {
                            handleShow();
                          } else {
                            setOpenCheckoutbid(true);
                          }
                        }}
                      >
                        Buy Now
                      </button>
                    )}
                    <XummWalletModal
                      show={show}
                      setShow={setShow}
                      handleClose={handleClose}
                      handleShow={handleShow}
                      connectButonHide={true}
                      disConnectButtonHide={true}
                    />
                    {/* <button
                      className="btn-main btn2 lead mb-5"
                      onClick={() => setOpenCheckoutbid(true)}
                    >
                      Place Bid
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {openCheckout && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckout(false)}
            >
              x
            </button>
            {result ? (
              <h4>NFT send to Market Place Successfully</h4>
            ) : (
              <>
                <div className="heading">
                  <h3>Sell NFT</h3>
                </div>
                <p>
                  You are about to list your NFT on the marketplace
                  {/* <span className="bold">AnimeSailorClub #304</span>
              <span className="bold">from Monica Lucas</span> */}
                </p>
                <div className="detailcheckout mt-4">
                  <div className="listcheckout">
                    <h6>
                      Enter Price:
                      {/* ( */}
                      {/* <span className="color">minimum value: 01 XRP</span> */}
                      {/* ) */}
                    </h6>
                    <h4></h4>
                    <input
                      type="number"
                      name="buy_now_qty"
                      id="buy_now_qty"
                      className="form-control"
                      placeholder="Enter Your Selling Price"
                      onChange={(e) => {
                        setDataObject((preData) => {
                          return {
                            ...preData,
                            amount: (
                              Number(e.target.value) * 1000000
                            ).toString(),
                          };
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 XRP</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 XRP</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 XRP</div>
            </div> */}
                <button
                  className="btn-main lead mb-5"
                  onClick={() => {
                    if (dataObject && dataObject.amount > 0) {
                      sellNftFunc();
                    } else {
                      toast.error("Please Enter The Correct Amount");
                    }
                  }}
                >
                  {sellOfferLoader ? (
                    <div className="spinner-borderDiv">
                      <div className="spinner-border " role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  ) : (
                    // {/* <button className="btn-main lead mb-5" onClick={()=>console.log(dataObject)}> */}
                    `Checkout`
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {sellQrLoader ? (
        <div className="spinner-borderDiv">
          <div className="spinner-border " role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : showQr ? (
        <div className="QrSellModal">
          <div className="QrSellModalInner">
            <button className="btn-close" onClick={() => setShowQr(false)}>
              x
            </button>
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>
                  Scan QR code from XUMM Mobile Application to sell your NFT
                </h4>
                <img src={sellQr} alt="Sell Png" />
              </div>
              <div className="removeUnderlineDiv">
                <a href={sellLink} target="_blank" className="removeUnderline">
                  XUMM Wallet
                </a>
              </div>
            </>
          </div>
        </div>
      ) : (
        ""
      )}

      {openCheckoutbid && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckoutbid(false)}
            >
              x
            </button>
            {buyResult ? (
              <h4>Congratulations! NFT purchased successfully!</h4>
            ) : (
              <>
                <div className="heading">
                  <h3>Buy NFT</h3>
                </div>
                <p>
                  You are about to buy a NFT
                  {/* <span className="bold">AnimeSailorClub #304</span>
              <span className="bold">from Monica Lucas</span> */}
                </p>
                {/* <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid (XRP)</h6>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="detailcheckout mt-3">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input
                  type="text"
                  name="buy_now_qty"
                  id="buy_now_qty"
                  className="form-control"
                />
              </div>
            </div> */}
                <div className="heading mt-3">
                  <p>NFT Amount</p>
                  <div className="subtotal">{nftObj?.amount / 1000000} XRP</div>
                </div>
                {/* <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 XRP</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 XRP</div>
            </div> */}
                <button
                  className="btn-main lead mb-5"
                  onClick={buyNftFunc}
                  disabled={acceptNftLoader}
                >
                  {acceptNftLoader ? (
                    <div className="spinner-borderDiv">
                      <div className="spinner-border " role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  ) : (
                    `Buy`
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div>
        {buyNftLoader ? (
          <div className="spinner-borderDiv">
            <div className="spinner-border " role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : showBuyQr ? (
          <div className="QrSellModal">
            <div className="QrSellModalInner">
              <button className="btn-close" onClick={() => setBuyShowQr(false)}>
                x
              </button>
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>
                    Scan QR code from XUMM Mobile Application to buy this NFT
                  </h4>
                  <img src={buyQr} alt="Buy Png" />
                </div>
                <div className="removeUnderlineDiv">
                  <a href={buyLink} target="_blank" className="removeUnderline">
                    XUMM Wallet
                  </a>
                </div>
              </>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default memo(NFTDetail);
// {openCheckout && (
//   <div className="checkout">
//     <div className="maincheckout">
//       <button
//         className="btn-close"
//         onClick={() => setOpenCheckout(false)}
//       >
//         x
//       </button>
//       <div className="heading">
//         <h3>Checkout</h3>
//       </div>
//       <p>
//         You are about to purchase a{" "}
//         <span className="bold">AnimeSailorClub #304</span>
//         <span className="bold">from Monica Lucas</span>
//       </p>
//       <div className="detailcheckout mt-4">
//         <div className="listcheckout">
//           <h6>
//             Enter quantity.
//             <span className="color">10 available</span>
//           </h6>
//           <input
//             type="text"
//             name="buy_now_qty"
//             id="buy_now_qty"
//             className="form-control"
//           />
//         </div>
//       </div>
//       <div className="heading mt-3">
//         <p>Your balance</p>
//         <div className="subtotal">10.67856 ETH</div>
//       </div>
//       <div className="heading">
//         <p>Service fee 2.5%</p>
//         <div className="subtotal">0.00325 ETH</div>
//       </div>
//       <div className="heading">
//         <p>You will pay</p>
//         <div className="subtotal">0.013325 ETH</div>
//       </div>
//       <button className="btn-main lead mb-5">Checkout</button>
//     </div>
//   </div>
// )}

// {openCheckoutbid && (
//   <div className="checkout">
//     <div className="maincheckout">
//       <button
//         className="btn-close"
//         onClick={() => setOpenCheckoutbid(false)}
//       >
//         x
//       </button>
//       <div className="heading">
//         <h3>Place a Bid</h3>
//       </div>
//       <p>
//         You are about to purchase a{" "}
//         <span className="bold">AnimeSailorClub #304</span>
//         <span className="bold">from Monica Lucas</span>
//       </p>
//       <div className="detailcheckout mt-4">
//         <div className="listcheckout">
//           <h6>Your bid (ETH)</h6>
//           <input type="text" className="form-control" />
//         </div>
//       </div>
//       <div className="detailcheckout mt-3">
//         <div className="listcheckout">
//           <h6>
//             Enter quantity.
//             <span className="color">10 available</span>
//           </h6>
//           <input
//             type="text"
//             name="buy_now_qty"
//             id="buy_now_qty"
//             className="form-control"
//           />
//         </div>
//       </div>
//       <div className="heading mt-3">
//         <p>Your balance</p>
//         <div className="subtotal">10.67856 ETH</div>
//       </div>
//       <div className="heading">
//         <p>Service fee 2.5%</p>
//         <div className="subtotal">0.00325 ETH</div>
//       </div>
//       <div className="heading">
//         <p>You will pay</p>
//         <div className="subtotal">0.013325 ETH</div>
//       </div>
//       <button className="btn-main lead mb-5">Checkout</button>
//     </div>
//   </div>
// )}
