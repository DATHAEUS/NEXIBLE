import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";
import api from "../../core/api";
import { useSelector } from "react-redux";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftMusicCard = ({
  nft,
  audioUrl,
  className = "d-item liveAuction col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  height,
  onImgLoad,
}) => {
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };
  const signedInUser = useSelector((e) => e.auth.signedInUser);

  const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
        audio.pause();
      };
    }, []);

    return [playing, toggle];
  };

  const [playing, toggle] = useAudio(audioUrl);

  return (
    <div
      className={className}
      onClick={() => navigate(`/ItemDetail/${nft?._id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* <div className='nft-border'> */}
      <div className="nft__item m-0">
        {nft?.deadline && (
          <div className="de_countdown">
            <Clock deadline={nft?.deadline} />
          </div>
        )}
        <div className="author_list_pp">
          <span onClick={() => navigateTo(`/author/${nft?.owner?._id}`)}>
            <img
              className="lazy"
              src={
                nft?.owner?.profile
                  ? nft?.owner?.profile
                  : "https://diablocrossfit.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-14-at-8.23.42-PM.png"
              }
              alt="owner"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <i className="fa fa-check"></i>
          </span>
        </div>
        <div className="nft__item_wrap">
          <Outer className="nft__item_wrapInner">
            <span>
              <img
                onLoad={onImgLoad}
                src={
                  nft?.nft_img
                    ? nft?.nft_img
                    : "https://benzinga.com/wp-content/uploads/2021/08/img_611548de04f4a.png"
                }
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
          <div className="nft_type_wrap">
            <div onClick={toggle} className="player-container">
              <div className={`play-pause ${playing ? "pause" : "play"}`}></div>
            </div>
            <div className={`circle-ripple ${playing ? "play" : "init"}`}></div>
          </div>
        </div>
        <div className="nft__item_info">
          <span onClick={() => navigateTo(`${nft?.nft_link}/${nft?.id}`)}>
            <h4>{nft?.title ? nft?.title : "No title available"}</h4>
          </span>
          <div className="nft__item_price">
            {nft?.amount ? nft?.amount / 1000000 : 0} XRP
            {/* <span>
              {nft?.bid}/{nft?.max_bid}
            </span> */}
          </div>
          <div className="nft__item_action">
            {/* <span onClick={() => navigateTo(`${nft?.bid_link}/${nft?.id}`)}>
              Place a bid
            </span> */}
            <span>
              {nft.nftType === "mint"
                ? nft?.owner?._id === signedInUser?._id
                  ? "Sell NFT"
                  : "This NFT is not on Sell"
                : nft?.owner?._id === signedInUser?._id
                // ? "This NFT is on Sell"
                ? "You owned this NFT"
                : "Buy Now"}
            </span>
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft?.likes}</span>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default memo(NftMusicCard);
