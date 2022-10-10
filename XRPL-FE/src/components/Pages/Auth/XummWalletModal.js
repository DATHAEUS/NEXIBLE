import { Modal, Button } from "react-bootstrap";
import XummExample from "./XummWallet";
import xummIcon from "./../../../assets/Images/xumm.png";
import walletConnectPng from "./../../../assets/Images/walletConnectPng.png";
import xrplWallet from "./../../../assets/Images/xrplWallet.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  connectXum,
  connectXumQr,
  disconnectWallet,
  getBalanceXumm,
  signedIn,
  wallet_connect,
} from "../../../store/actions/thunks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { io } = require("socket.io-client");

function XummWalletModal({
  show,
  setShow,
  handleClose,
  handleShow,
  connectButonHide,
  disConnectButtonHide,
  navButton,
}) {
  const [cumImg, setCumImg] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [walletAccountAddress, setWalletAccountAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [result, setResult] = useState("");
  const connectXumm = useSelector((e) => e.auth.connectXumm);
  const connectXummLoader = useSelector((e) => e.auth.connectXummLoader);
  const connectXummLink = useSelector((e) => e.auth.connectXummLink);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (show) {
      dispatch(connectXumQr(false));
    }
  }, [show]);

  useEffect(() => {
    console.log(connectXumm);
  }, [connectXumm]);
  const connectWallet = () => {
    dispatch(connectXum(socketId));
  };
  const walletConnectFunc = () => {
    dispatch(wallet_connect(socketId));
  };

  useEffect(() => {
    // const socket = io(baseURL);
    const socket = io("https://xrpl-xumm.herokuapp.com");

    socket.on("connect", function (data) {
      console.log("connected", socket.id);
      setSocketId(socket.id);
      console.log(socket.id);
    });
    socket.on("liveXum", (data) => {
      console.log(data, "runnnnnnnnnn");
      //   console.log(data,'');
    });
    socket.on("result", (data) => {
      setResult(data);
      console.log(data);
      if (data?.type === "error") {
        connectWallet();
        toast.error(data.message);
      }
      setAccountAddress(data?.result?.response?.account);
      if (data?.result?.response?.account) {
        localStorage.setItem("walletAddress", data.result.response.account);
        localStorage.setItem("nexibleToken", data.token);
        localStorage.setItem("nexibleUser", JSON.stringify(data.user));
        dispatch(signedIn());
        if (!data.user.email) {
          navigate("/add-Info");
        }
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

  useEffect(() => {
    console.log(connectXummLoader, "connectXummLoader");
  }, [connectXummLoader]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {navButton ? (
        <>
          {!accountAddress ? (
            <button className="connectButtonDrawer" onClick={handleShow}>
              Connect
            </button>
          ) : (
            <button
              className="connectButtonDrawer"
              onClick={() => {
                dispatch(disconnectWallet());
                setAccountAddress("");
              }}
            >
              Disconnect
            </button>
          )}
        </>
      ) : (
        <>
          {!connectButonHide ? (
            <>
              {accountAddress ? (
                <div
                  className="connect-wal"
                  onClick={() => {
                    setAccountAddress("");
                  }}
                >
                  <a>Disconnect</a>
                  {/* <a>Connect Wallet</a> */}
                </div>
              ) : (
                <div className="connect-wal" onClick={handleShow}>
                  {/* <a>disconnect</a> */}
                  <a>Connect Wallet</a>
                </div>
              )}
            </>
          ) : disConnectButtonHide ? null : (
            <div
              className="connect-wal"
              onClick={() => {
                dispatch(disconnectWallet());
              }}
            >
              <a>Disconnect</a>
              {/* <a>Connect Wallet</a> */}
            </div>
          )}
        </>
      )}

      <Modal show={show} onHide={handleClose} className="connectWalletModal">
        <Modal.Body>
          <div className="innerConnectModal">
          {accountAddress ? (
            <h4 className="connectWalletHeading">Wallet Is Connected</h4>
          ) : (
            <>
              {!connectXumm && !connectXummLoader ? (
                <>
                  <h4 className="connectWalletHeading">Connect Wallet</h4>
                  <div className="wallet" onClick={connectWallet}>
                    <img src={xummIcon} />
                    <div>
                      <h6>Connect Your Xumm Wallet</h6>
                      <p>Click here to connect your XUMM Wallet</p>
                    </div>
                  </div>
                </>
              ) : null}

              {connectXummLoader ? (
                <>
                  <div className="spinner-borderDiv">
                    <div className="spinner-border " role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                </>
              ) : (
                connectXumm && (
                  <>
                    <div className="qrCodeDiv">
                      <img src={connectXumm} alt="png" />
                      <h4 className="connectWalletHeading">
                        Scan QR Code From your Xumm App
                      </h4>
                    </div>
                    {isMobile ? (
                      <div className="removeUnderlineDiv">
                        <a
                          href={connectXummLink}
                          target="_blank"
                          className="removeUnderline"
                        >
                          XUMM Wallet
                        </a>
                      </div>
                    ) : null}
                  </>
                )
              )}
              {/* <h4>Balance</h4>
                        {balance}
                        <button onClick={getBalance}>Get Balance</button>
                        <h4>Result</h4>
                        <div>{JSON.stringify(result)}</div> */}
            </>
          )}

          {walletAccountAddress ? (
            <h4 className="connectWalletHeading">
              Wallet Connect wallet Is Connected
            </h4>
          ) : (
            // <>
            //   {!connectXumm ? (
            //     <>
            <div className="wallet" onClick={walletConnectFunc}>
              <img src={walletConnectPng} alt="walletConnect" />
              <div>
                <h6>Connect Your WalletConnect</h6>
                <p>Click here to connect your walletConnect</p>
              </div>
            </div>
            //     </>
            //   ) : null}
            // </>
          )}
            <div className="wallet createButton" onClick={()=>{
              handleClose()
              navigate('/add-Info')
            }}>
              <img src={xrplWallet} alt="walletConnect" />
              <div>
                <h6>Create Your Wallet</h6>
                <p>Click here to create your wallet</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default XummWalletModal;
