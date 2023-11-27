import { useState } from 'react';
import '../../styles/sections/cartpage/CartItem.scss';
import { API_LINK } from '../../default-value';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../store/slice/cartSlice';

const CartItem = ({ item }) => {
  const [number, setNumber] = useState(item.quantity);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleQuantity = async (quantity) => {
    try {
      let check = number;
      if (number + quantity === 0) {
        setNumber(Math.max(number + quantity, 1));
        check = Math.max(number + quantity, 1);
      } else {
        setNumber(number + quantity);
        check = number + quantity;
      }
      console.log(check);
      const res = await axios.patch(`${API_LINK}/cart/updateProduct`, {
        _id: cart.cart._id,
        product: item.product._id,
        quantity: check,
      });
      dispatch(getCart(res.data.cart));
    } catch (error) {
      console.log('Loi o handle quantity', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.patch(`${API_LINK}/cart/deleteProduct`, {
        _id: cart.cart._id,
        product: item.product._id,
      });
      dispatch(getCart(res.data.cart));
    } catch (error) {
      console.log('Loi o handle delete', error);
    }
  };

  return (
    <div className='cartlist__item'>
      <div className='quantity-box'>
        <div className='btn-edit' onClick={() => handleQuantity(1)}>
          +
        </div>
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          readOnly
        />
        <div className='btn-edit' onClick={() => handleQuantity(-1)}>
          -
        </div>
      </div>
      <div
        className='item__img'
        style={{ backgroundImage: `url(${item.product.image})` }}
      ></div>
      <div className='item__description'>
        <div className='item__name'>{item.product.name}</div>
        <div className='item__price'>
          {item.product.price.toLocaleString()}đ x {number}
        </div>
        <div className='item__total-price'>
          {(item.product.price * number).toLocaleString()}đ
        </div>
      </div>
      <div className='item__delete'>
        <button
          type='button'
          className='btn-close'
          onClick={() => handleDelete()}
        ></button>
      </div>
    </div>
  );
};

export default CartItem;
