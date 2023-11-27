import { useParams } from 'react-router-dom';
import '../styles/pages/Product.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../default-value';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../store/slice/cartSlice';
import ReactStars from 'react-stars';

const Product = () => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState();
  const [dataReview, setDataReview] = useState();
  const [number, setNumber] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/product/${id}`);
      setDataProduct(res.data.product);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = async () => {
    try {
      const res = await axios.patch(`${API_LINK}/cart/addProduct`, {
        _id: cart.cart._id,
        product: id,
        quantity: number,
      });
      dispatch(getCart(res.data.cart));
      alert(res.data.message);
    } catch (error) {
      console.log('Loi o handle add cart: ', error);
    }
  };

  return (
    <>
      {dataProduct && (
        <div className='product container'>
          <div
            className='product__img'
            style={{ backgroundImage: `url(${dataProduct.image})` }}
          ></div>
          <div className='product__info'>
            <h3>{dataProduct.name}</h3>
            <p className='product__price'>
              <span>đ </span>
              {dataProduct.price.toLocaleString()}
            </p>
            <div className='product__description'>
              <b>
                Thông tin chi tiết: <br />
              </b>
              <ul>
                {dataProduct.description.split('\n').map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
            <div className='product__number'>
              <div
                className='btn-edit'
                onClick={() => setNumber((prev) => Math.max(prev - 1, 1))}
              >
                -
              </div>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <div
                className='btn-edit'
                onClick={() => setNumber((prev) => prev + 1)}
              >
                +
              </div>
              <div className='btn-addcart' onClick={() => handleAddToCart()}>
                Add to cart
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='review container'>
        <div className='review__header'>
          <h3>Đánh giá sản phẩm</h3>
        </div>
        <div className='review__body'>
          <div className='review__wrap'>
            <div className='review__avatar'></div>
            <div className='review__main'>
              <div className='review__author-name'>totiendung</div>
              <ReactStars count={5} value={5} size={16} color2={'#ffd700'} edit={false} />
              <div className='review__time'>22-10-2023</div>
              <div className='review__comment'>asdfadsagsdg</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
