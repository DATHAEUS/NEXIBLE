const initialState = {
  nfts: [],
  nftLength: 0,
};

const nftReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NFTS':
      return {
        ...state,
        nfts: [...state.nfts, ...action.payload],
      };
    case 'NFT_LENGTH':
      return {
        ...state,
        nftLength: action.payload,
      };
    // case 'GET_USERS':
    //   return {
    //     ...state,
    //     users: action.payload,
    //   };
    default:
      return {
        ...state,
      };
  }
};
export default nftReducer;
