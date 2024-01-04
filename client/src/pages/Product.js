import { useParams } from 'react-router-dom';
import '../styles/pages/Product.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../default-value';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../store/slice/cartSlice';
import ReactStars from 'react-stars';
import moment from 'moment';

const Product = () => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState();
  const [dataReview, setDataReview] = useState();
  const [number, setNumber] = useState(1);
  const [page, setPage] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/product/${id}`);
      setDataProduct(res.data.product);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      const res2 = await axios.get(`${API_LINK}/review/product/${id}`, {
        params: {
          page: page,
          limit: 5,
        },
      });
      setDataReview(res2.data.review);
    };
    fetchData();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps
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
          {dataReview &&
            dataReview.map((item) => (
              <div className='review__wrap' key={item._id}>
                <div className='review__avatar' style={{ backgroundImage: `url(${item.user.image})` }}></div>
                <div className='review__main'>
                  <div className='review__author-name'>
                    {item.user.username}
                  </div>
                  <ReactStars
                    count={5}
                    value={item.rating}
                    size={16}
                    color2={'#ffd700'}
                    edit={false}
                  />
                  <div className='review__time'>
                    {moment(item.createdAt)
                      .format('DD-MM-YYYY  hh:mm')
                      .toString()}
                  </div>
                  <div className='review__comment'>{item.comment}</div>
                </div>
              </div>
            ))}
        </div>
        <ul className='pagination page'>
          <li className='page-item'>
            <span
              className='page-link'
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </span>
          </li>
          <li className='page-item'>
            <span className='page-link'>{page}</span>
          </li>
          <li className='page-item'>
            <span
              className='page-link'
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Product;
