import '../styles/pages/OrderDesPage.scss';
import { FaShoppingBag } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import OrderItem from '../sections/orderpage/OrderItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../default-value';
import moment from 'moment';
import ReactStars from 'react-stars';

const OrderDesPage = () => {
  const { id } = useParams();
  const [dataOrder, setDataOrder] = useState();
  const [open, setOpen] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  console.log(open);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_LINK}/order/${id}`);
        console.log(res.data.order);
        setDataOrder(res.data.order);
      } catch (error) {
        console.log('Loi o fetchOrder:', error);
      }
    };
    fetchOrder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const sumQuantity = (list) => {
    let number = 0;
    list?.forEach((item) => {
      if (item) {
        number += item.quantity;
      }
    });
    return number;
  };

  const submitReview = async () => {
    try {
      const res = await axios.post(
        `${API_LINK}/review/create`,
        {
          rating,
          comment,
          product: open,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      console.log(res.data);
      setOpen(false);
      alert(res.data.message);
    } catch (error) {
      console.log('Lỗi ở submit Review:', error);
    }
  };
  return (
    <>
      <div className='orderpage container'>
        <div className='title'>
          <FaShoppingBag color='#60a5fa' />
          <span>Chi tiết đơn hàng</span>
        </div>
        <div className='info-wrap'>
          <h5 className='info-header'>Thông tin đơn hàng</h5>
          <div className='info-item'>
            <span className='info-title'>ID:</span>
            <span className='info-value'>#{dataOrder?._id.substr(-5)}</span>
          </div>
          <div className='info-item'>
            <span className='info-title'>Ngày đặt hàng:</span>
            <span className='info-value'>
              {moment(dataOrder?.createdAt).format('DD-MM-YYYY').toString()}
            </span>
          </div>
          <div className='info-item'>
            <span className='info-title'>Trạng thái giao hàng:</span>
            <span className='info-value'>
              {dataOrder?.statusShipping ? (
                <span className='badge order-status-noti-complete'>
                  Đã giao hàng
                </span>
              ) : (
                <span className='badge order-status-noti'>Chờ xác nhận</span>
              )}
            </span>
          </div>
          <div className='info-item'>
            <span className='info-title'>Trạng thái thanh toán:</span>
            <span className='info-value'>
              {dataOrder?.statusPayment ? (
                <span className='badge order-status-noti-complete'>
                  Đã thanh toán
                </span>
              ) : (
                <span className='badge order-status-noti'>Chờ thanh toán</span>
              )}
            </span>
          </div>
        </div>
        <div className='info-wrap'>
          <h5 className='info-header'>Thông tin giao hàng</h5>
          <div className='info-item'>
            <span className='info-title'>Họ và tên:</span>
            <span className='info-value'>{dataOrder?.fullname}</span>
          </div>
          <div className='info-item'>
            <span className='info-title'>Số điện thoại:</span>
            <span className='info-value'>{dataOrder?.phone}</span>
          </div>
          <div className='info-item'>
            <span className='info-title'>Địa chỉ:</span>
            <span className='info-value'>{dataOrder?.address}</span>
          </div>
        </div>
        <div className='card cartpage__box'>
          <div className='cartpage__header card-header'>
            <div className='info-item'>
              <span className='info-title'>Số lượng:</span>
              <span className='info-value'>
                {sumQuantity(dataOrder?.list)} sản phẩm
              </span>
            </div>
            <div className='info-item'>
              <span className='info-title'>Thành tiền:</span>
              <span className='info-value'>
                {dataOrder?.total.toLocaleString()}đ
              </span>
            </div>
          </div>
          <div className='card-body cartpage__list'>
            <div className='card'>
              <div className='orderlist'>
                {dataOrder?.list &&
                  dataOrder?.list.map((item) => (
                    <OrderItem
                      key={item._id}
                      item={item}
                      setOpen={setOpen}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {open && (
          <div className='shopreg__popup'>
            <div className='popup__box'>
              <div className='popup__star'>
                <div className='popup__title'>Đánh giá chất lượng sản phẩm</div>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={(newRating) => setRating(newRating)}
                  size={72}
                  color2={'#ffd700'}
                />
              </div>
              <div className='mb-3 popup__message'>
                <textarea
                  className='form-control'
                  placeholder='Để lại bình luận tại đây'
                  rows='3'
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className='button-wrap'>
                <div
                  className='button button-cancel'
                  onClick={(e) => setOpen('')}
                >
                  Cancel
                </div>
                <div
                  className='button button-submit'
                  onClick={(e) => submitReview()}
                >
                  Xác nhận
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDesPage;
