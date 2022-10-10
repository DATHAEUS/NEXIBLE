import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../store/selectors";
import * as actions from "../../store/actions/thunks";
import { clearNfts, clearFilter } from "../../store/actions";
import NftCard from "./NftCard";
import NftMusicCard from "./NftMusicCard";
import { shuffleArray } from "../../store/utils";

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  shuffle = false,
  authorId = null,
}) => {
  const dispatch = useDispatch();
  const nftItems = useSelector(selectors.nftItems);
  const [nfts, setNfts] = useState([]);
  const [height, setHeight] = useState(0);
  const getUserNft = useSelector((e) => e.NFTData.getUserNft);
  const getUserNftLoader = useSelector(e => e.NFTData.getUserNftLoader)

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  // extra work need to delte after meta data
  useEffect(() => {
    // if (getUserNft.length) {
      // console.log(getUserNft);
      // let arr = []
      // getUserNft.map((a, i) => {
      //     nftItems.map((b, j) => {
      //         if (i === j) {
      //             arr = [...arr, { ...b, ...a }]
      //         }
      //     })
      // })
      // setNfts(arr)
      setNfts(getUserNft);
    // }
  }, [getUserNft]);

  useEffect(() => {
    dispatch(actions.fetchNftsBreakdown(authorId));
  }, [dispatch, authorId]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(actions.fetchNftsBreakdown(authorId));
  };

  return (
    <div className="row">
        {getUserNftLoader ?
                <div className='LoaderNFT'>
                    <div class="spinner-border text-primary" role="status">
                    </div>
                </div>
                :
                nfts.length ?
                <>
      {nfts &&
        nfts.map((nft, index) =>
          nft.category === "music" ? (
            <NftMusicCard
              nft={nft}
              audioUrl={nft.audio_url}
              key={index}
              onImgLoad={onImgLoad}
              height={height}
            />
          ) : (
            <NftCard
              nft={nft}
              key={index}
              onImgLoad={onImgLoad}
              height={height}
            />
          )
        )}
      {showLoadMore && nfts.length <= 20 && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
      </>
      :
      <div className='nothingSell'>
          <p>There is nothing on sell</p>
      </div>
  }
    </div>
  );
};

export default memo(ColumnNewRedux);
