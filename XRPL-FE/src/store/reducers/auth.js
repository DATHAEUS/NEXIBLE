import {
  ADD_CARD_LOADER,
  CANCEL_PAYMENT_LOADER,
  CONFIRM_PAYMENT_LOADER,
  CONNECT_XUMM_LOADER,
  CONNECT_XUM_QR,
  CREATE_OTP_ACC_LOADER,
  GET_ACCOUNT_ID,
  OTP_LOADER,
  PAYMENT_ID,
  SIGNED_IN,
  SIGNIN_LOADER,
  SIGNUP_LOADER,
  XUMM_BALANCE,
} from "../actions/thunks/auth";

export const defaultState = {
  newSignInLoader: false,
  newSignUpLoader: false,
  signedInUser: false,
  connectXumm: false,
  connectXummLink: false,
  xummBalance: false,
  walletAccount: false,
  connectXummLoader: false,
  otpLoader: false,
  otpVerifyLoader: false,
  addCardLoader: false,
  paymentId: false,
  confirmPaymentLoader: false,
  cancelPaymentLoader: false,
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case SIGNIN_LOADER:
      // console.log(action)
      return {
        ...state,
        newSignInLoader: action.payload,
      };
    case SIGNUP_LOADER:
      console.log(action);
      return {
        ...state,
        newSignUpLoader: action.payload,
      };

    case SIGNED_IN:
      console.log(action);
      return {
        ...state,
        signedInUser: action.payload,
      };

    case CONNECT_XUM_QR:
      console.log(action);
      return {
        ...state,
        connectXumm: action.payload.qr_png,
        connectXummLink: action.payload.link,
      };

    case XUMM_BALANCE:
      console.log(action);
      return {
        ...state,
        xummBalance: action.payload,
      };
    case GET_ACCOUNT_ID:
      console.log(action);
      return {
        ...state,
        walletAccount: action.payload,
      };
    case CONNECT_XUMM_LOADER:
      console.log(action);
      return {
        ...state,
        connectXummLoader: action.payload,
      };
    case OTP_LOADER:
      console.log(action);
      return {
        ...state,
        connectXummLoader: action.payload,
      };
    case CREATE_OTP_ACC_LOADER:
      console.log(action);
      return {
        ...state,
        otpVerifyLoader: action.payload,
      };
    case ADD_CARD_LOADER:
      console.log(action);
      return {
        ...state,
        addCardLoader: action.payload,
      };
    case PAYMENT_ID:
      console.log(action);
      return {
        ...state,
        paymentId: action.payload,
      };
    case CONFIRM_PAYMENT_LOADER:
      console.log(action);
      return {
        ...state,
        confirmPaymentLoader: action.payload,
      };
      case CANCEL_PAYMENT_LOADER:
        console.log(action);
        return {
          ...state,
          cancelPaymentLoader: action.payload,
        };
      
    default:
      return state;
  }
};
export default states;
