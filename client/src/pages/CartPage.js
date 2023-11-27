import { useSelector } from 'react-redux';
import '../styles/pages/CartPage.scss';
import CartItem from '../sections/cartpage/CartItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const navigator = useNavigate();
  const [cartForm, setCartForm] = useState({
    number: 0,
    total: 0,
  });

  useEffect(() => {
    let number = 0,
      total = 0;
      console.log(cart.cart);
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
        <div className='cartpage__header card-header'>Cart</div>
        <div className='card-body cartpage__list'>
          <div className='card'>
            <div className='cartlist'>
              {cart.cart.list &&
                cart.cart.list.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
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
          <button
            className='btn btn-primary cart-payment-btn'
            type='submit'
            onClick={() => navigator('/payment')}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
