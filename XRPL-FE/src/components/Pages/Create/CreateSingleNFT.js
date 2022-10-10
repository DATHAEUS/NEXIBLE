import React, { Component, useEffect, useState } from "react";
import Clock from "../../components/Clock";
import Footer from "../../components/footer";
import { createGlobalStyle } from "styled-components";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { mintNft } from "../../../store/actions/thunks/NFT";
import { io } from "socket.io-client";
import NftMintModal from "./NftMintModal";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import { TagsInput } from "react-tag-input-component";

const GlobalStyles = createGlobalStyle`
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: rgb(4, 17, 243) ;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Createpage = (props) => {
  // onChange = onChange.bind(this);
  // state = {
  //   files: [],
  const [tags, setTags] = useState([]);

  const [nftDataObj, setNftDataObj] = useState({
    nft_img: "",
    title: "",
    description: "",
    royality: "",
    // tags: selected,
  });
  const [files, setFiles] = useState([]);
  const [base64NftImg, setBase64NftIMg] = useState("");
  const [isActive, setIsActive] = useState("");
  const [socketId, setSocketId] = useState("");
  const [showNftModal, setShowNftModal] = useState(false);
  const handleClose = () => setShowNftModal(false);
  const [result, setResult] = useState(false);
  const [royality, setRoyality] = useState('');
  const user = useSelector((e) => e.auth.signedInUser);

  const onChange = (e) => {
    // var files = e.target.files;
    // var filesArr = Array.prototype.slice.call(files);
    // document.getElementById("file_name").style.display = "none";
    // // setState({ files: [...files, ...filesArr] });
    // setFiles([...files, ...filesArr]);
    setNftDataObj((pre) => {
      return {
        ...pre,
        nft_img: e.target.files[0],
      };
    });
    // setBase64NftIMg(e.target.files[0]);
  };

  useEffect(() => {
    if (nftDataObj.nft_img) {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      async function Main() {
        // const file = document.querySelector("#myfile").files[0];
        const img = await toBase64(nftDataObj.nft_img);
        setBase64NftIMg(img);
      }
      Main();
    }
  }, [nftDataObj.nft_img]);

  const handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow1 = () => {
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow2 = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  };

  // state = {
  //   isActive: false
  // }
  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    // const socket = io(baseURL);
    const socket = io("https://xrpl-xumm.herokuapp.com");

    socket.on("connect", function (data) {
      console.log("connected", socket.id);
      setSocketId(socket.id);
      console.log(socket.id);
    });
    socket.on("mintingNft", (data) => {
      console.log(data, "runnnnnnnnnn");
      //   console.log(data,'');
    });
    socket.on("mintResult", (data) => {
      // setResult(data);
      // console.log(data);
      // setAccountAddress(data.result.response.account);
      if (data.nft) {
        console.log(data);
        setResult(true);
        // localStorage.setItem("walletAddress", data.result.response.account);
        // localStorage.setItem("nexibleToken", data.token);
        // localStorage.setItem("nexibleUser", JSON.stringify(data.user));

        // navigate("/Explore");
        setNftDataObj({
          nft_img: "",
          title: "",
          description: "",
          royality: "",
          // tags: selected,
        })
        setTags([])
        setRoyality('')
        console.log(data, "runnnnnnnnnn");
      }
      // token dbe22deb-bc6c-4e35-ac0a-fe9cd3305a04
      // account ry8ydKHUJP4vna4V7kuAGmDAX9Xzd4oxf
    });

    socket.on("disconnect", function (message) {
      console.log("Socket disconnected from server: ", message);
    });

    return () => {
      socket.close();
    };
    // eslint-disable-next-line
  }, []);

  const openNftModal = (e) => {
    e.preventDefault();
    // navigate("/Explore");
    // console.log("Nice");
    // console.log({ nftDataObj, tags });
    props.mintNft(socketId, nftDataObj, tags, navigate);
    setShowNftModal(true);
    setResult(false);
    // setNftModalHandleClose(true);
  };

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create 2</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form
              id="form-create-item"
              className="form-border"
              onSubmit={openNftModal}
            >
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                  {files.map((x) => (
                    <p key="{index}">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}
                    </p>
                  ))}
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      required
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Select method</h5>
                <div className="de_tab tab_methods">
                  <ul className="de_nav">
                    <li id="btn1" className="active" onClick={handleShow}>
                      <span>
                        <i className="fa fa-tag"></i>Fixed price
                      </span>
                    </li>
                    <li id="btn2" onClick={handleShow1}>
                      <span>
                        <i className="fa fa-hourglass-1"></i>Timed auction
                      </span>
                    </li>
                    <li id="btn3" onClick={handleShow2}>
                      <span>
                        <i className="fa fa-users"></i>Open for bids
                      </span>
                    </li>
                  </ul>

                  <div className="de_tab_content pt-3">
                    {/* <div id="tab_opt_1">
                      <h5>Price</h5>
                      <input
                        type="text"
                        name="item_price"
                        id="item_price"
                        className="form-control"
                        placeholder="enter price for one item (XRP  x)"
                      />
                    </div> */}

                    <div id="tab_opt_2" className="hide">
                      <h5>Minimum bid</h5>
                      <input
                        type="text"
                        name="item_price_bid"
                        id="item_price_bid"
                        className="form-control"
                        placeholder="enter minimum bid"
                      />

                      <div className="spacer-20"></div>

                      <div className="row">
                        <div className="col-md-6">
                          <h5>Starting date</h5>
                          <input
                            type="date"
                            name="bid_starting_date"
                            id="bid_starting_date"
                            className="form-control"
                            min="1997-01-01"
                          />
                        </div>
                        <div className="col-md-6">
                          <h5>Expiration date</h5>
                          <input
                            type="date"
                            name="bid_expiration_date"
                            id="bid_expiration_date"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div id="tab_opt_3"></div>
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Unlock once purchased
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock"
                      className="checkbox"
                    />
                    {isActive ? (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockHide}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockClick}
                      ></label>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  <p className="p-info pb-3">
                    Unlock content after successful transaction.
                  </p>

                  {isActive ? (
                    <div id="unlockCtn" className="hide-content">
                      <input
                        type="text"
                        name="item_unlock"
                        id="item_unlock"
                        className="form-control"
                        placeholder="Access key, code to redeem or link to a file..."
                      />
                    </div>
                  ) : null}
                </div>

                <h5>Title</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                  value={nftDataObj.title}
                  onChange={(e) => {
                    setNftDataObj((pre) => {
                      return {
                        ...pre,
                        title: e.target.value,
                      };
                    });
                  }}
                  required
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                  value={nftDataObj.description}
                  onChange={(e) => {
                    setNftDataObj((pre) => {
                      return {
                        ...pre,
                        description: e.target.value,
                      };
                    });
                  }}
                  required
                ></textarea>

                <div className="spacer-10"></div>

                {/* <h5>Price</h5>
                <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (XRP  x)" /> */}

                <div className="spacer-10"></div>

                <h5>Royalties</h5>
                <input
                  type="text"
                  name="item_royalties"
                  id="item_royalties"
                  required
                  className="form-control"
                  placeholder="Example: 0%, 10%, 20%, 30%. Maximum is 50%"
                  value={royality}
                  onChange={(ev) => {
                    let roy = ev.target.value
                    setRoyality(ev.target.value)
                    if (roy.split('%').lenght > 2) {
                      toast.error('Please enter valid royality');
                    } else {
                      let royAm = roy.split('%')[0]
                      setNftDataObj((pre) => {
                        return {
                          ...pre,
                          royality: Number(royAm) * 1000,
                        };
                      });
                    }
                  }
                  }
                />
                <p id="item_royaltiesText">
                  * Example: 0, 10%, 20%, 30%. Maximum is 50%
                </p>
                <div className="spacer-10"></div>
                <h5>Tags</h5>
                <div>
                  {/* <pre>{JSON.stringify(selected)}</pre> */}
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="Tags"
                    required
                    placeHolder="Enter Tags"
                  />
                  <em>press enter to add new tag</em>
                </div>

                <div className="spacer-10"></div>

                <button
                  type="submit"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                // onClick={() => openNftModal()}
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              {/* <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div> */}
              <div className="author_list_pp">
                <span>
                  <img
                    className="lazy"
                    // src="./img/author/author-1.jpg"
                    src={`${user.profile}`}
                    alt="user"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  <img
                    // src="./img/collections/coll-item-3.jpg"
                    src={`${nftDataObj?.nft_img
                      ? base64NftImg
                      : "./img/collections/coll-item-3.jpg"
                      }`}
                    id="get_file_2"
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>{nftDataObj?.title}</h4>
                </span>
                <div className="nft__item_price">
                  0 XRP x<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NftMintModal
        show={showNftModal}
        handleClose={handleClose}
        result={result}
      />

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      mintNft,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Createpage);
