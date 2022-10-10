import axios from 'axios';
import { BASE_URL } from '../../constant';

// Get NFTs
export const GetAllNfts = (page, alert, checkMore) => {
  return (dispatch) => {
    // console.log('GetAllNfts', page);
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'get',
      url: `${BASE_URL}/api/v1/admin/nft/get?page=${page}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log(result.data);

        if (result.data.nfts.length) {
          dispatch(setAllNfts(result.data.nfts));
          dispatch(setNftLength(result.data.nftlength[0].total));
          // checkMore(true);
          return;
        } else {
          checkMore(false);
          return;
        }
      })
      .catch((err) => {
        // console.log(err.response);
        alert.error(err.response.data.message);
        return;
      });
  };
};

export const setAllNfts = (payload) => ({
  type: 'GET_NFTS',
  payload: payload,
});
export const setNftLength = (payload) => ({
  type: 'NFT_LENGTH',
  payload: payload,
});
