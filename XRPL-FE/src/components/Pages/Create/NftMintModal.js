import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NftMintModal({ show, handleClose, result }) {
  const [cumImg, setCumImg] = useState("");
  const mintNftQr = useSelector((e) => e.NFTData.mintNftQr);
  const mintNftLink = useSelector((e) => e.NFTData.mintNftLink);
  const mintNftQrLoader = useSelector((e) => e.NFTData.mintNftQrLoader);
  const data = useSelector((e) => e);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    // mintNFt(socketId, navigate);
    console.log(mintNftQr);
    setCumImg(mintNftQr);
  }, [mintNftQr]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="connectWalletModal">
        <Modal.Body>
          {result ? (
            <h4 className="connectWalletHeading">Nft Minted Successfully</h4>
          ) : (
            <>
              {
                // mintNftQrLoader ?
                //    <div className="spinner-borderDiv">
                //    <div className="spinner-border " role="status">
                //      <span className="sr-only"></span>
                //    </div>
                //  </div>
                // :
                mintNftQr && (
                  <>
                    <div className="qrCodeDiv">
                      <img src={cumImg.toString()} alt="png" />
                      <h4 className="connectWalletHeading">
                        Scan QR Code From your Xumm App
                      </h4>
                    </div>
                    <div className="removeUnderlineDiv">
                      <a
                        href={mintNftLink}
                        target="_blank"
                        className="removeUnderline"
                      >
                        XUMM Wallet
                      </a>
                    </div>
                  </>
                )
              }
              {/* <h4>Balance</h4>
                        {balance}
                        <button onClick={getBalance}>Get Balance</button>
                        <h4>Result</h4>
                        <div>{JSON.stringify(result)}</div> */}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NftMintModal;
