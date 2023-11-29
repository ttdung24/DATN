import { login } from './slice/accountSlice';
import axios from 'axios';
import { API_LINK } from '../default-value';
import { getShop } from './slice/shopSlice';
import { getCategories } from './slice/categorySlice';
import { getCart } from './slice/cartSlice';

export const signIn = async (dispatch, userForm) => {
  try {
    const res = await axios.post(`${API_LINK}/auth/login`, userForm);
    dispatch(login(res.data.accessToken));
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    localStorage.setItem('role', res.data.role);
  } catch (error) {
    alert('Đăng nhập thất bại');
    console.log('Loi o signIn - apiCall: ', error);
  }
};

export const getInfomation = async (dispatch, accessToken) => {
  try {
    const res = await axios.get(`${API_LINK}/shop`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res2 = await axios.get(`${API_LINK}/category`);
    const res3 = await axios.post(`${API_LINK}/cart/`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getShop(res.data.shop));
    dispatch(getCategories(res2.data.category));
    dispatch(getCart(res3.data.cart));
  } catch (error) {
    console.log(error);
  }
};
