import axios from 'axios';
import { BASE_URL } from './../../constant';

export const getPayments = (page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'get',
      // url: `${BASE_URL}/api/v1/admin/payment?page=${page}`,
      url: `${BASE_URL}/api/v1/admin/payment?page=${page}&limit=${limit}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('payments', result.data);
        if (result.data.data.length) {
          dispatch(getPaymentsData(result.data.data));
          dispatch(setPaymentLength(result.data.length));
        }
      })
      .catch((err) => {
        // console.log('err in getting payments', err);
      });
  };
};

export const getPaymentsData = (payments) => ({
  type: 'GET_PAYMENTS',
  payload: payments,
});
export const setPaymentLength = (length) => ({
  type: 'PAYMENT_LENGTH',
  payload: length,
});

export const deletePaymentFunc = (paymentId, alert, closeModal, page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'delete',
      url: `${BASE_URL}/api/v1/admin/payment/${paymentId}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('deleteUser', result.data);
        alert.success('Payment deleted successfully');
        dispatch(getPaymentUpdate(page, limit));
        closeModal(false);
      })
      .catch((e) => {
        // console.log('deleteUserError', e);
        alert.error('Something went wrong Payment');
        closeModal(false);
      });
  };
};

export const editPaymentFunc = (paymentId, dataObject, alert, closeModal, page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'put',
      url: `${BASE_URL}/api/v1/admin/payment/${paymentId}`,
      headers: {
        token,
      },
      data: dataObject,
    };
    axios(config)
      .then((result) => {
        // console.log('editUser', result.data);
        alert.success('Payment updated successfully');
        dispatch(getPaymentUpdate(page, limit));
        closeModal(false);
      })
      .catch((e) => {
        // console.log('editUserError', e);
        alert.error('Something went wrong Payment');
        closeModal(false);
      });
  };
};

export const getPaymentUpdate = (page, limit) => {
  return (dispatch) => {
    const token = localStorage.getItem('xrplToken');
    const config = {
      method: 'get',
      // url: `${BASE_URL}/api/v1/admin/payment/get?page=${page}`,
      url: `${BASE_URL}/api/v1/admin/payment?page=${0}&limit=${page}`,
      headers: {
        token,
      },
    };
    axios(config)
      .then((result) => {
        // console.log('users', result.data.users);
        // console.log('row', result.data);
        if (result.data.data.length) {
          dispatch(setPaymentUpdate(result.data.data));
          // dispatch(getUsersLength(result.data.usersLength[0].total));
        } else {
          // console.log('no more user found');
          // setIsMore(false);
        }
      })
      .catch((err) => {
        // console.log('err in getting users', err);
      });
  };
};

export const setPaymentUpdate = (update) => ({
  type: 'GET_PAYMENT_UPDATE',
  payload: update,
});
