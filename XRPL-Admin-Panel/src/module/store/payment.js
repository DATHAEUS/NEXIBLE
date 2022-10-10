const initialState = {
  payments: [],
  paymentLength: 0,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'GET_SIGNED_IN_USER':
    //   return {
    //     ...state,
    //     signedInUser: action.payload,
    //   };
    case 'GET_PAYMENTS':
      return {
        ...state,
        payments: [...state.payments, ...action.payload],
      };
    case 'GET_PAYMENT_UPDATE':
      return {
        ...state,
        payments: [...action.payload],
      };
    case 'PAYMENT_LENGTH':
      return {
        ...state,
        paymentLength: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default paymentReducer;
