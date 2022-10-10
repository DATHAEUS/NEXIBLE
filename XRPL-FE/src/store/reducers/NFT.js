import {
  ACCEPT_NFT_LOADER,
  BUY_NFT_LOADER,
  BUY_QR,
  GET_USER_NFT_DATA,
  GET_USER_NFT_DATA_LOADER,
  MINT_NFT_LOADER,
  MINT_NFT_QR,
  ON_SELL_NFT,
  SELL_LOADER_NFT,
  SELL_OFFER_LOADER,
  SELL_OFFER_LOADER_NFT,
  SELL_QR,
  SINGLE_NFT,
} from "../actions/thunks/NFT";

export const defaultState = {
  getUserNftLoader: false,
  getUserNft: false,
  mintNftQr: false,
  mintNftLink: false,
  mintNftQrLoader: false,
  singleNft: false,
  sellQr: false,
  sellLink: false,
  sellQrLoader: false,
  onSellData: false,
  buyQr: false,
  buyLink: false,
  buyNftLoader: false,
  sellOfferLoader: false,
  acceptNftLoader: false,
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_NFT_DATA_LOADER:
      // console.log(action)
      return {
        ...state,
        getUserNftLoader: action.payload,
      };

    case GET_USER_NFT_DATA:
      console.log(action.payload);
      return {
        ...state,
        getUserNft: action.payload,
      };

    case MINT_NFT_QR:
      console.log(action);
      return {
        ...state,
        mintNftQr: action.payload.qr_png,
        mintNftLink: action.payload.link,
      };

    case MINT_NFT_LOADER:
      console.log(action);
      return {
        ...state,
        mintNftQrLoader: action.payload,
      };

    case SINGLE_NFT:
      console.log(action);
      return {
        ...state,
        singleNft: action.payload,
      };
    case SELL_QR:
      console.log(action);
      return {
        ...state,
        sellQr: action.payload.qr_png,
        sellLink: action.payload.link,
      };

    case SELL_LOADER_NFT:
      console.log(action);
      return {
        ...state,
        sellQrLoader: action.payload,
      };
    // case SELL_OFFER_LOADER:
    //   console.log(action);
    //   return {
    //     ...state,
    //     sellOfferLoader: action.payload,
    //   };
    case SELL_OFFER_LOADER_NFT:
      console.log(action);
      return {
        ...state,
        sellOfferLoader: action.payload,
      };
    case ACCEPT_NFT_LOADER:
      console.log(action);
      return {
        ...state,
        acceptNftLoader: action.payload,
      };
    case ON_SELL_NFT:
      console.log(action);
      return {
        ...state,
        onSellData: action.payload,
      };
    case BUY_QR:
      console.log(action);
      return {
        ...state,
        buyQr: action.payload.qr_png,
        buyLink: action.payload.link,
      };
    case BUY_NFT_LOADER:
      console.log(action);
      return {
        ...state,
        buyNftLoader: action.payload,
      };

    default:
      return state;
  }
};
export default states;
