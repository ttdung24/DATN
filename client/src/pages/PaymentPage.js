import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages/PaymentPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_LINK } from '../default-value';
import axios from 'axios';
import { getCart } from '../store/slice/cartSlice';

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [cartForm, setCartForm] = useState({
    number: 0,
    total: 0,
  });

  const [paymentForm, setPaymentForm] = useState({
    fullname: '',
    address: '',
    phone: '',
    note: '',
  });

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${API_LINK}/order`, {
        ...paymentForm,
        ...cartForm,
        ...cart.cart,
      });
      dispatch(getCart(res.data.cart));
      alert(res.data.message);
      navigator(`/payment/${res.data.order._id}`);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    let number = 0,
      total = 0;
    cart.cart.list.forEach((item) => {
      if (item) {
        number += item.quantity;
        total += item.product.price * item.quantity;
      }
    });
    setCartForm({
      ...cartForm,
      number: number,
      total: total,
    });
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='cartpage container'>
      <div className='card cartpage__box'>
        <div className='cartpage__header card-header'>Thông tin giao hàng</div>
        <div className='card-body cartpage__list'>
          <div className='my-3'>
            <label className='form-label'>Họ và tên</label>
            <input
              type='text'
              className='form-control'
              placeholder='Họ và tên'
              value={paymentForm.fullname}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, fullname: e.target.value })
              }
            />
          </div>
          <div className='my-3'>
            <label className='form-label'>Số điện thoại</label>
            <input
              type='text'
              className='form-control'
              placeholder='Số điện thoại'
              value={paymentForm.phone}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, phone: e.target.value })
              }
            />
          </div>
          <div className='my-3'>
            <label className='form-label'>Địa chỉ</label>
            <input
              type='text'
              className='form-control'
              placeholder='Địa chỉ'
              value={paymentForm.address}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, address: e.target.value })
              }
            />
          </div>
          <div className='my-3'>
            <label className='form-label'>Chú ý</label>
            <div className='form-floating'>
              <textarea
                className='form-control'
                placeholder='Chú ý'
                style={{ height: '100px' }}
                value={paymentForm.note}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, note: e.target.value })
                }
              ></textarea>
              <label>Chú ý</label>
            </div>
          </div>
        </div>
      </div>
      <div className='cartpage__payment'>
        <div className='card cartpage__payment-content'>
          <div className='payment__header'>
            <div className='payment__title'>Số lượng:</div>
            <div className='payment__value'>{cartForm.number} sản phẩm</div>
          </div>
          <div className='payment__header'>
            <div className='payment__title'>Thành tiền:</div>
            <div className='payment__value'>
              {cartForm.total.toLocaleString()}đ
            </div>
          </div>
          <div className='shop-note-wrap'>
            <span className='note-title'>Chú ý: </span>
            <span className='note-content'>
              Hiện tại chúng tôi chỉ hỗ trợ thanh toán trực tiếp khi nhận hàng.
            </span>
          </div>
          <div className='btn-wrap'>
            <button
              className='btn btn-primary rollback-btn'
              type='submit'
              onClick={() => navigator('/cart')}
            >
              Quay lại
            </button>
            <button
              className='btn btn-primary continue-btn'
              type='submit'
              onClick={() => handlePayment()}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
