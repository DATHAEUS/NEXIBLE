import axios from "axios";

import { toast } from "react-toastify";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";
import { FALSE } from "sass";

// import { toast } from "react-toastify";

// const initAuth0 = new auth0.WebAuth(configAuth)

// https://xrpl-xumm.herokuapp.com/ deploy backend Link

export const logOut = (redirectUser) => {
  return (dispatch) => {
    localStorage.removeItem("nexibleToken");
    localStorage.removeItem("nexibleUser");
    localStorage.removeItem("walletAddress");
    dispatch(getAccountIdLoader(false));
    dispatch(signedInData(false));
    // redirectUser('/')
  };
};

export const getAccountId = () => {
  return (dispatch) => {
    let walletaddress = localStorage.getItem("walletAddress");
    if (walletaddress) {
      dispatch(getAccountIdLoader(walletaddress));
    }
    // redirectUser('/')
  };
};

export const disconnectWallet = () => {
  return (dispatch) => {
    localStorage.removeItem("walletAddress");
    dispatch(getAccountIdLoader(false));
    // dispatch(logOut());
    dispatch(logOut());

    // redirectUser('/')
  };
};

export const GET_ACCOUNT_ID = "GET_ACCOUNT_ID";
export const getAccountIdLoader = (payload) => {
  return {
    type: GET_ACCOUNT_ID,
    payload: payload,
  };
};

export const signedIn = () => {
  return (dispatch) => {
    let token = localStorage.getItem("nexibleToken");
    let user = false;
    if (token) {
      user = localStorage.getItem("nexibleUser");
      if (user) {
        let userObj = JSON.parse(user);
        dispatch(signedInData(userObj));
        dispatch(getAccountId());
      }
    } else {
      dispatch(signInData(false));
    }
  };
};

export const SIGNED_IN = "SIGNED_IN";
export const signedInData = (payload) => {
  return {
    type: SIGNED_IN,
    payload: payload,
  };
};

export const SIGNUP_LOADER = "SIGNUP_LOADER";
export const signUpLoader = (payload) => {
  return {
    type: SIGNUP_LOADER,
    payload: payload,
  };
};

export const signUp = (obj, redirectUser) => {
  return (dispatch) => {
    console.log(obj);
    dispatch(signUpLoader(true));
    var axios = require("axios");
    // var data = JSON.stringify(obj);

    var config = {
      method: "post",
      url: "https://xrpl-xumm.herokuapp.com/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("nexibleToken", response.data.token);
        localStorage.setItem("nexibleUser", JSON.stringify(response.data.user));
        redirectUser("/Profile");
        dispatch(signedIn());
        dispatch(signUpLoader(false));
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
        console.log(error);
        dispatch(signUpLoader(false));
      });
  };
};

export const SIGN_UP_DATA = "SIGN_UP_DATA";
export const signUpData = (payload) => {
  return {
    type: SIGN_UP_DATA,
    payload: payload,
  };
};

export const SIGNIN_LOADER = "SIGNIN_LOADER";
export const signInLoader = (payload) => {
  return {
    type: SIGNIN_LOADER,
    payload: payload,
  };
};

export const signIn = (obj, redirectUser) => {
  return (dispatch) => {
    console.log(obj);
    dispatch(signInLoader(true));
    var axios = require("axios");
    // var data = JSON.stringify(obj);

    var config = {
      method: "post",
      url: "https://xrpl-xumm.herokuapp.com/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("nexibleToken", response.data.token);
        localStorage.setItem("nexibleUser", JSON.stringify(response.data.user));
        redirectUser("/Home");
        dispatch(signInLoader(false));
        dispatch(signedIn());
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(signInLoader(false));
      });
  };
};

export const SIGN_IN_DATA = "SIGN_IN_DATA";
export const signInData = (payload) => {
  return {
    type: SIGN_IN_DATA,
    payload: payload,
  };
};

export const UPDATE_USER = "UPDATE_USER";
export const updateUserLoader = (payload) => {
  return {
    type: UPDATE_USER,
    payload: payload,
  };
};

export const updateUser = (obj, redirectUser) => {
  return (dispatch) => {
    console.log(obj);
    dispatch(updateUserLoader(true));
    var axios = require("axios");
    let token = localStorage.getItem("nexibleToken");
    // var data = JSON.stringify(obj);

    var config = {
      method: "put",
      url: "https://xrpl-xumm.herokuapp.com/api/v1/user/profile/update",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: obj,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        // localStorage.setItem('nexibleToken', response.data.token)
        localStorage.setItem("nexibleUser", JSON.stringify(response.data.user));
        dispatch(signedIn());
        dispatch(updateUserLoader(false));
        redirectUser("Collection/User?u=me");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
        console.log(error);
        dispatch(updateUserLoader(false));
      });
  };
};

export const CONNECT_XUMM_LOADER = "CONNECT_XUMM_LOADER";
export const connectXummLoader = (payload) => {
  return {
    type: CONNECT_XUMM_LOADER,
    payload: payload,
  };
};

export const connectXum = (socketId) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("nexibleUser"));
    dispatch(connectXummLoader(true));
    if (user) {
      // console.log("Nice");
      const getImg = await axios.get(
        `https://xrpl-xumm.herokuapp.com/api/v1/xumm/signIn/${socketId}?userId=${user._id}`
      );
      if (getImg.data) {
        dispatch(
          connectXumQr({ qr_png: getImg.data.message, link: getImg.data.link })
        );
        dispatch(connectXummLoader(false));
        dispatch(signedIn());
      }
      // setCumImg(getImg.data.message);
    } else {
      // console.log("Nice");
      const getImg = await axios.get(
        `https://xrpl-xumm.herokuapp.com/api/v1/xumm/signIn/${socketId}`
      );
      if (getImg.data) {
        dispatch(
          connectXumQr({ qr_png: getImg.data.message, link: getImg.data.link })
        );
        dispatch(connectXummLoader(false));
        dispatch(signedIn());
      }
      // setCumImg(getImg.data.message);
    }
  };
};
export function wallet_connect(
  // WalletConnect,
  // QRCodeModal,
  navigate,
  alert,
  alertText,
  setSearch
) {
  return async (dispatch) => {
    console.log("WalletConnect");
    //  Create WalletConnect Provider
    //   const provider = new WalletConnectProvider({
    //     rpc: {
    //       1: "https://s.devnet.rippletest.net:51234",
    //       // 3: "https://ropsten.mycustomnode.com",
    //       // 100: "https://dai.poa.network",
    //       // ...
    //     },
    //   });

    //   //  Enable session (triggers QR Code modal)
    //   await provider.enable();
    //   // // Subscribe to accounts change
    //   // provider.on("connect", (error, payload) => {
    //   //   console.log({ error, payload });
    //   // });
    //   provider.on("accountsChanged", (accounts) => {
    //     console.log(accounts);
    //   });

    //   // Subscribe to chainId change
    //   provider.on("chainChanged", (chainId) => {
    //     console.log(chainId);
    //   });

    //   // Subscribe to session disconnection
    //   provider.on("disconnect", (code, reason) => {
    //     console.log(code, reason);
    //   });
    //   // await provider.disable();

    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // const web3 = new Web3(connector)
    // const chainId = await web3.eth.getChainId();
    // console.log({chainId});

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      console.log("not connector");
      connector.createSession();
    }
    console.log(connector);

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log("connect", { accounts, chainId });
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log("session_update", { accounts, chainId });
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });
  };
}

export const CONNECT_XUM_QR = "CONNECT_XUM_QR";
export const connectXumQr = (payload) => {
  return {
    type: CONNECT_XUM_QR,
    payload: payload,
  };
};

export const getBalanceXumm = (accountAddress) => {
  return async (dispatch) => {
    const myBalance = await axios.get(
      `https://xrpl-xumm.herokuapp.com/api/v1/xumm/get-balance/${accountAddress}`
    );
    console.log(myBalance, "myBalance");
    if (myBalance.data) {
      // setBalance(myBalance.data.response);
      dispatch(xummBalance(myBalance.data.response));
    }
  };
};

export const XUMM_BALANCE = "XUMM_BALANCE";
export const xummBalance = (payload) => {
  return {
    type: XUMM_BALANCE,
    payload: payload,
  };
};




export const OTP_LOADER = "OTP_LOADER";
export const otpLoader = (payload) => {
  return {
    type: OTP_LOADER,
    payload: payload,
  };
};

export const verifyOTP = (email, setActiveTab) => {
  return async (dispatch) => {
    dispatch(otpLoader(true))
    var axios = require('axios');
    var data = JSON.stringify({
      "email": email
    });

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/auth/user/otp-email',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        dispatch(otpLoader(false))
        setActiveTab('addInfo')
        toast.success("OTP has sent to your email")
      })
      .catch(function (error) {
        dispatch(otpLoader(false))
        toast.error(error.response.data.message)
      });

  };
};

export const OTP_DATA = "OTP_DATA";
export const otpData = (payload) => {
  return {
    type: OTP_DATA,
    payload: payload,
  };
};



export const CREATE_OTP_ACC_LOADER = "CREATE_OTP_ACC_LOADER";
export const createAccOtpLoader = (payload) => {
  return {
    type: CREATE_OTP_ACC_LOADER,
    payload: payload,
  };
};

export const createOtpData = (obj, activeTab) => {
  return async (dispatch) => {
    dispatch(createAccOtpLoader(true))
    var axios = require('axios');
    var data = obj;

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/auth/user/check-otp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        dispatch(createAccOtpLoader(false))
        localStorage.setItem("nexibleToken", response.data.token);
        localStorage.setItem("nexibleUser", JSON.stringify(response.data.user));
        // redirectUser("/Profile");
        dispatch(signedIn());
        activeTab('Pricing')
        toast.success("User Created Successfully")
      })
      .catch(function (error) {
        dispatch(createAccOtpLoader(false))
        toast.error(error.response.data.message)
      });

  };
};

// export const OTP_DATA = "OTP_DATA";
// export const otpData = (payload) => {
//   return {
//     type: OTP_DATA,
//     payload: payload,
//   };
// };


export const ADD_CARD_LOADER = "ADD_CARD_LOADER";
export const addCardLoader = (payload) => {
  return {
    type: ADD_CARD_LOADER,
    payload: payload,
  };
};

export const addCardData = (obj, setShow, amount) => {
  return async (dispatch) => {
    dispatch(addCardLoader(true))
    let token = localStorage.getItem("nexibleToken");
    var axios = require('axios');
    var data = obj;

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/auth/user/add-stripe-card',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("nexibleToken", response.data.token);
        localStorage.setItem("nexibleUser", JSON.stringify(response.data.update_user));
        // redirectUser("/Profile");
        console.log(response.data.token)
        dispatch(signedIn());
        dispatch(createPayment(amount, setShow))
        toast.success("Card Added Successfully")
      })
      .catch(function (error) {
        dispatch(addCardLoader(false))
        toast.error(error.response.data.message)
      });

  };
};


export const createPayment = (amount, setShow) => {
  return async (dispatch) => {
    dispatch(addCardLoader(true))
    let token = localStorage.getItem("nexibleToken");
    var axios = require('axios');
    var data = {
      "amount": amount
    };

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/user/stripe/create-payment-intent',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        dispatch(addCardLoader(false))
        console.log(response)
        dispatch(paymentId(response.data.data.id))
        setShow(true)
      })
      .catch(function (error) {
        dispatch(addCardLoader(false))
        toast.error(error.response.data.message)
      });

  };
};


export const PAYMENT_ID = "PAYMENT_ID";
export const paymentId = (payload) => {
  return {
    type: PAYMENT_ID,
    payload: payload,
  };
};

// export const OTP_DATA = "OTP_DATA";
// export const otpData = (payload) => {
//   return {
//     type: OTP_DATA,
//     payload: payload,
//   };
// };




export const CONFIRM_PAYMENT_LOADER = "CONFIRM_PAYMENT_LOADER";
export const confirmLoaderPayment = (payload) => {
  return {
    type: CONFIRM_PAYMENT_LOADER,
    payload: payload,
  };
};

export const confirmPayment = (id, setShow, redirect) => {
  return async (dispatch) => {
    dispatch(confirmLoaderPayment(true))
    let token = localStorage.getItem("nexibleToken");
    var axios = require('axios');
    var data = {
      payment_intent_id: id
    };

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/user/stripe/confirm-payment',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        dispatch(confirmLoaderPayment(false))
        setShow(false)
        toast.success("Payment Success")
        redirect()
      })
      .catch(function (error) {
        dispatch(confirmLoaderPayment(false))
        toast.error(error.response.data.message)
      });

  };
};




export const CANCEL_PAYMENT_LOADER = "CANCEL_PAYMENT_LOADER";
export const cancelLoaderPayment = (payload) => {
  return {
    type: CANCEL_PAYMENT_LOADER,
    payload: payload,
  };
};

export const cancelPayment = (id, setShow) => {
  return async (dispatch) => {
    dispatch(cancelLoaderPayment(true))
    let token = localStorage.getItem("nexibleToken");
    var axios = require('axios');
    var data = {
      payment_intent_id: id
    };

    var config = {
      method: 'post',
      url: 'https://xrpl-xumm.herokuapp.com/api/v1/user/stripe/cancel-payment',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        dispatch(cancelLoaderPayment(false))
        setShow(false)
        toast.success("Payment Canceled")
      })
      .catch(function (error) {
        dispatch(cancelLoaderPayment(false))
        toast.error(error.response.data.message)
      });

  };
};
