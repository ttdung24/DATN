import { useParams } from 'react-router-dom';
import '../../styles/pages/Product.scss';
import '../../styles/sections/shop/ShopReviews.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../../default-value';
import ReactStars from 'react-stars';
import moment from 'moment';

const ShopReviews = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [dataReview, setDataReview] = useState();
  const fetchData = async () => {
    const res = await axios.get(`${API_LINK}/review/product/${id}`, {
      params: {
        page: page,
        limit: 10,
      },
    });
    setDataReview(res.data.review);
  };
  const deleteReview = async (id) => {
    const res = await axios.delete(`${API_LINK}/review/${id}`);
    alert(res.data.message);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='review container'>
      <div className='review__header'>
        <h3>Đánh giá sản phẩm</h3>
      </div>
      <div className='review__body'>
        {dataReview &&
          dataReview.map((item) => (
            <div className='review__wrap' key={item._id}>
              <div className='review__avatar'></div>
              <div className='review__main'>
                <div className='review__author-name'>{item.user.username}</div>
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
              <div className='review__delete'>
                <div
                  className='btn-delete'
                  onClick={() => deleteReview(item._id)}
                >
                  Xóa
                </div>
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
  );
};

export default ShopReviews;
