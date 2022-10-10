import React, { memo } from "react";

const CustomSlide = ({ index, avatar, banner, username, uniqueId, collectionId }) => {
  return (
    <div className='itm' index={index} >
      <div className="nft_coll"
      //  style={{"border":"2px solid transparent","borderImage":"linear-gradient(142deg, rgba(100,255,120,1) 0%, rgba(22,22,37,1) 50%, rgba(34,43,212,1) 100%)","borderImageSlice":"1"}}
      >
        <div className="nft_wrap" >
          <span><img src={banner} className="lazy img-fluid" alt="" /></span>
        </div>
        <div className="nft_coll_pp">
          <span onClick={() => window.open("/Collection/" + collectionId, "_self")}><img className="lazy" src={avatar} alt="" /></span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <span onClick={() => window.open("/Collection/" + collectionId, "_self")}><h4>{username}</h4></span>
          <span>{uniqueId}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(CustomSlide);