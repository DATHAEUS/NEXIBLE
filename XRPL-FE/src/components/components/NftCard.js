import React, { memo } from "react";
import styled from "styled-components";
import Clock from "./Clock";
import { useNavigate } from "react-router-dom";
import api from "../../core/api";
import { userFromJSON } from "opensea-js/lib/utils/utils";
import { useSelector } from "react-redux";
import NexibleLogoFit from "../../assets/Images/Nexible.png";
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({
  nft,
  className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  clockTop = true,
  height,
  onImgLoad,
}) => {
  const signedInUser = useSelector((e) => e.auth.signedInUser);
  // console.log(signedInUser);
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <div
      className={className}
      onClick={() => navigate(`/ItemDetail/${nft._id}`)}
      style={{ cursor: "pointer" }}
    >
      {/* <div className='nft-border'> */}
      <div className="nft__item m-0">
        {nft?.item_type === "single_items" ? (
          <div className="icontype">
            <i className="fa fa-bookmark"></i>
          </div>
        ) : (
          <div className="icontype">
            <i className="fa fa-shopping-basket"></i>
          </div>
        )}
        {nft?.deadline && clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft?.deadline} />
          </div>
        )}
        <div className="author_list_pp">
          <span onClick={() => navigateTo(`/author/${nft?.owner?._id}`)}>
            <img className="lazy" src={nft?.owner?.profile} alt="owner" />
            <i className="fa fa-check"></i>
          </span>
        </div>
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer style={{ width: "100%" }}>
            <span>
              <img
                style={
                  nft?.nft_img
                    ? { objectFit: "cover" }
                    : { objectFit: "contain" }
                }
                onLoad={onImgLoad}
                src={nft?.nft_img ? nft?.nft_img : NexibleLogoFit}
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
        </div>
        {nft?.deadline && !clockTop && (
          <div className="de_countdown">
            <Clock deadline={nft?.deadline} />
          </div>
        )}
        <div className="nft__item_info">
          <span onClick={() => navigateTo(`${nft.nft_link}/${nft.id}`)}>
            <h4>{nft?.title ? nft?.title : "No title available"}</h4>
          </span>
          {nft.status === "has_offers" ? (
            <div className="has_offers">
              <span className="through">{nft.priceover}</span> {nft.price} ETH
            </div>
          ) : (
            <div className="nft__item_price">
              {nft?.amount ? nft?.amount / 1000000 : 0} XRP
              {nft.status === "on_auction" && (
                <span>
                  {nft.bid}/{nft.max_bid}
                </span>
              )}
            </div>
          )}
          <div className="nft__item_action">
            <span>
              {nft.nftType === "mint"
                ? nft?.owner?._id === signedInUser?._id
                  ? "Sell NFT"
                  : "This NFT is not on Sell"
                : nft?.owner?._id === signedInUser?._id
                ? // ? "This NFT is on Sell"
                  "You owned this NFT"
                : "Buy Now"}
            </span>
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default memo(NftCard);
