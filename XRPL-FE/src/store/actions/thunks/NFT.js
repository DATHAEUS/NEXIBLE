import axios from "axios";
import { toast } from "react-toastify";

export const GET_USER_NFT_DATA_LOADER = "GET_USER_NFT_DATA_LOADER";
export const getUserNFTLoaderData = (payload) => {
  return {
    type: GET_USER_NFT_DATA_LOADER,
    payload: payload,
  };
};

export const getUserNFT = () => {
  return (dispatch) => {
    let token = localStorage.getItem("nexibleToken");
    const userObject = JSON.parse(localStorage.getItem("nexibleUser"));
    if (token) {
      dispatch(getUserNFTLoaderData(true));

      var config = {
        method: "get",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/get-user-nft-db/${userObject._id}`,
        headers: {
          token: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          dispatch(getUserNFTLoaderData(false));
          console.log(response.data.nfts);
          dispatch(getUserNFTData(response.data.nfts));
        })
        .catch(function (error) {
          dispatch(getUserNFTLoaderData(false));
          console.log(error);
        });
    } else {
      dispatch(getUserNFTLoaderData(false));
    }
  };
};

export const getUserNFTOnSell = (userId) => {
  return (dispatch) => {
    let token = localStorage.getItem("nexibleToken");
    if (token) {
      dispatch(getUserNFTLoaderData(true));

      var config = {
        method: "get",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/get-user-nft-on-sell/${userId}`,
        headers: {
          token: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          dispatch(getUserNFTLoaderData(false));
          console.log(response.data.nfts);
          dispatch(getUserNFTData(response.data.nfts));
        })
        .catch(function (error) {
          dispatch(getUserNFTLoaderData(false));
          console.log(error);
        });
    } else {
      dispatch(getUserNFTLoaderData(false));
    }
  };
};

export const GET_USER_NFT_DATA = "GET_USER_NFT_DATA";
export const getUserNFTData = (payload) => {
  return {
    type: GET_USER_NFT_DATA,
    payload: payload,
  };
};

export const SELL_OFFER_LOADER = "SELL_OFFER_LOADER";
export const sellOfferLoaderData = (payload) => {
  console.log("sellOfferLoadersellOfferLoader");
  return {
    type: SELL_OFFER_LOADER,
    payload: payload,
  };
};

export const MINT_NFT_LOADER = "MINT_NFT_LOADER";
export const mintNFTLoader = (payload) => {
  return {
    type: MINT_NFT_LOADER,
    payload: payload,
  };
};
// Mint Nft
export const mintNft = (socketId, nftDataObj, tags, navigate) => {
  return (dispatch) => {
    dispatch(mintNFTLoader(true));
    console.log("mint fuction call");

    let token = localStorage.getItem("nexibleToken");
    let walletAddress = localStorage.getItem("walletAddress");
    const formData = new FormData();
    formData.append("title", nftDataObj.title);
    formData.append("description", nftDataObj.description);
    formData.append("royality", nftDataObj.royality);
    formData.append("nft_img", nftDataObj.nft_img);
    formData.append("account", walletAddress);
    if (tags.length) {
      if (tags.length === 1) {
        formData.append("tags[0]", tags[0]);
      } else {
        tags?.map((tag) => formData.append("tags", tag));
      }
    }
    // let data = {
    //   account: walletAddress,
    // };

    if (token) {
      dispatch(sellOfferLoaderData(true));

      var config = {
        method: "post",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/mint-nft/${socketId}`,
        // url: `http://localhost:5000/api/v1/user/xumm-xrpl/mint-nft/${socketId}`,
        headers: {
          token: token,
        },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          dispatch(mintNFTLoader(false));
          console.log(response);
          //   response.data.qr_png;
          dispatch(
            setMintNftQr({
              qr_png: response.data.qr_png,
              link: response.data.link,
            })
          );
          // navigate("/Explore");
          // console.log(JSON.stringify(response.data));
          // dispatch(sellOfferLoaderData(true))
          // console.log(response.data.getNfts.result.account_nfts)
          // dispatch(set(response.data.getNfts.result.account_nfts))
        })
        .catch(function (error) {
          dispatch(mintNFTLoader(false));
          // dispatch(sellOfferLoaderData(false))
          toast.error(error.response.data.message);
          console.log(error);
        });
    } else {
      dispatch(sellOfferLoaderData(false));
    }
  };
};

export const MINT_NFT_QR = "MINT_NFT_QR";
export const setMintNftQr = (payload) => {
  return {
    type: MINT_NFT_QR,
    payload: payload,
  };
};

// Get Single NFT
export const getSingleNft = (nftId, navigate) => {
  return (dispatch) => {
    console.log("getSingleNft fuction call");

    // let token = localStorage.getItem("nexibleToken");
    // let walletAddress = localStorage.getItem("walletAddress");
    // let data = {
    //   account: walletAddress,
    // };
    if (nftId) {
      dispatch(sellOfferLoaderData(true));

      var config = {
        method: "get",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/get-single-nft/${nftId}`,
        // headers: {
        //   token: token,
        // },
      };

      axios(config)
        .then(function (response) {
          console.log(response);
          //   response.data.qr_png;
          console.log(response.data.nft);
          dispatch(setSingleNft(response.data.nft));
          // navigate("/Explore");
        })
        .catch(function (error) {
          // dispatch(sellOfferLoaderData(false))
          console.log(error);
        });
    } else {
      dispatch(sellOfferLoaderData(false));
    }
  };
};

export const SINGLE_NFT = "SINGLE_NFT";
export const setSingleNft = (payload) => {
  return {
    type: SINGLE_NFT,
    payload: payload,
  };
};

export const SELL_LOADER_NFT = "SELL_LOADER_NFT";
export const sellLoaderNFT = (payload) => {
  return {
    type: SELL_LOADER_NFT,
    payload: payload,
  };
};

export const SELL_OFFER_LOADER_NFT = "SELL_OFFER_LOADER_NFT";
export const sellOfferLoaderNFT = (payload) => {
  return {
    type: SELL_OFFER_LOADER_NFT,
    payload: payload,
  };
};

// Sell NFT
export const sellNft = (socketId, dataObject, nftObj, navigate) => {
  return (dispatch) => {
    console.log("sellNft fuction call");
    dispatch(sellOfferLoaderNFT(true));
    let token = localStorage.getItem("nexibleToken");
    let walletAddress = localStorage.getItem("walletAddress");
    let data = {
      account: walletAddress,
      amount: dataObject.amount,
      nftTokenId: nftObj.NFTokenID,
      _id: nftObj._id,
    };
    if (token) {
      dispatch(sellOfferLoaderData(true));

      var config = {
        method: "post",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/create-offer/${socketId}`,
        headers: {
          token: token,
        },
        data,
      };

      axios(config)
        .then(function (response) {
          dispatch(sellOfferLoaderNFT(false));
          console.log(response);
          //   response.data.qr_png;
          dispatch(sellOfferLoaderData(false));
          dispatch(
            setSellQr({
              qr_png: response.data.qr_png,
              link: response.data.link,
            })
          );

          // navigate("/Explore");
        })
        .catch(function (error) {
          dispatch(sellOfferLoaderNFT(false));
          toast.error(error.response.data.message);
          dispatch(sellOfferLoaderData(false));
          console.log(error);
        });
    } else {
      dispatch(sellOfferLoaderData(false));
      dispatch(sellOfferLoaderNFT(false));
    }
  };
};

export const SELL_QR = "SELL_QR";
export const setSellQr = (payload) => {
  return {
    type: SELL_QR,
    payload: payload,
  };
};

// Sell NFT
export const onSellNft = () => {
  return (dispatch) => {
    let token = localStorage.getItem("nexibleToken");

    var config = {
      method: "get",
      url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/nft-on-sell`,
      headers: {
        token: token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        dispatch(onSellNftData(response.data.nfts));

        // navigate("/Explore");
      })
      .catch(function (error) {
        // dispatch(sellOfferLoaderData(false))
        console.log(error);
      });
  };
};

export const ON_SELL_NFT = "ON_SELL_NFT";
export const onSellNftData = (payload) => {
  return {
    type: ON_SELL_NFT,
    payload: payload,
  };
};
export const BUY_NFT_LOADER = "BUY_NFT_LOADER";
export const buyNftLoader = (payload) => {
  return {
    type: BUY_NFT_LOADER,
    payload: payload,
  };
};

export const ACCEPT_NFT_LOADER = "ACCEPT_NFT_LOADER";
export const acceptNFTLoader = (payload) => {
  return {
    type: ACCEPT_NFT_LOADER,
    payload: payload,
  };
};

// Buy NFT
export const buyNft = (socketId, nftObj, navigate) => {
  return (dispatch) => {
    console.log("buyNft fuction call");
    dispatch(acceptNFTLoader(true));
    let token = localStorage.getItem("nexibleToken");
    let walletAddress = localStorage.getItem("walletAddress");
    let data = {
      account: walletAddress,
      tokenOfferId: nftObj.nft_offer_index,
      _id: nftObj._id,
    };
    if (token) {
      dispatch(sellOfferLoaderData(true));

      var config = {
        method: "put",
        url: `https://xrpl-xumm.herokuapp.com/api/v1/user/xumm-xrpl/accept-offer/${socketId}`,
        headers: {
          token: token,
        },
        data,
      };

      axios(config)
        .then(function (response) {
          console.log(response);
          dispatch(acceptNFTLoader(false));
          //   response.data.qr_png;
          dispatch(
            setBuyQr({ qr_png: response.data.qr_png, link: response.data.link })
          );

          // navigate("/Explore");
        })
        .catch(function (error) {
          // dispatch(sellOfferLoaderData(false))
          toast.error(error.response.data.message);
          dispatch(acceptNFTLoader(false));
          console.log(error);
        });
    } else {
      dispatch(sellOfferLoaderData(false));
    }
  };
};

export const BUY_QR = "BUY_QR";
export const setBuyQr = (payload) => {
  return {
    type: BUY_QR,
    payload: payload,
  };
};
