import React, { memo, useEffect, useState } from "react";
import NftMusicCard from "./NftMusicCard";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../../store/selectors";
import * as actions from "../../store/actions/thunks";
import { clearNfts, clearFilter } from "../../store/actions";
import { shuffleArray } from "../../store/utils";
import { onSellNft } from "../../store/actions/thunks/NFT";
import NftCard from "./NftCard";

const ColumnWithoutTime = ({
    showLoadMore = true,
    shuffle = false,
    authorId = null,
}) => {
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState([]);
    const nftItems = useSelector(selectors.nftItems);
    // const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({ target: img }) => {
        let currentHeight = height;
        if (currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    };

    useEffect(() => {
        dispatch(clearNfts());
        dispatch(actions.fetchNftsBreakdown(authorId, true));
        dispatch(onSellNft());
    }, [dispatch, authorId]);

    //will run when component unmounted
    useEffect(() => {
        return () => {
            dispatch(clearFilter());
            dispatch(clearNfts());
        };
    }, [dispatch]);

    const loadMore = () => {
        dispatch(actions.fetchNftsBreakdown(authorId, true));
    };

    const getNft = useSelector((e) => e.NFTData.onSellData);

    // extra work need to delte after meta data
    useEffect(() => {
        if (getNft && getNft.length) {
            console.log(getNft, "getNft");
            // let arr = []
            // getNft.map((a, i) => {
            //     nftItems.map((b, j) => {
            //         if (i === j) {
            //             console.log('eeeeee',i)
            //             arr = [...arr, { ...b, ...a }]
            //         }
            //     })
            // })
            setNfts(getNft);
        }
    }, [getNft]);
    useEffect(() => {
        console.log(nfts);
    }, [nfts]);
    return (
        <div className="row">
            {/* {nfts.length > 1 && nfts.slice(0,10).map((nft, index) => { */}
            {nfts.length ?
                <>
                    {nfts?.map((nft, index) => {
                        return (
                            <NftCard
                                // nft={nft}
                                // audioUrl={nft.audio_url}
                                // key={index}
                                // onImgLoad={onImgLoad}
                                // height={height}
                                nft={nft}
                                key={index}
                                onImgLoad={onImgLoad}
                                height={height}
                            />
                        );
                    })}
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

export default memo(ColumnWithoutTime);
