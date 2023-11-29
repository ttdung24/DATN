import { useEffect, useState } from 'react';
import '../styles/pages/OrderPage.scss';
import { FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import { API_LINK } from '../default-value';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [dataOrder, setDataOrder] = useState();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let res;
        if (localStorage.getItem('role') === 'admin') {
          res = await axios.get(`${API_LINK}/order/allorder`);
        } else {
          res = await axios.post(`${API_LINK}/order/my-order`, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
        }
        setDataOrder(res?.data.order);
      } catch (error) {
        console.log('Loi o fetch order', error);
      }
    };
    fetchOrder();
  }, []);
  return (
    <div className='orderpage container'>
      <div className='title'>
        <FaShoppingBag color='#60a5fa' />
        <span>Đơn hàng</span>
      </div>
      <div className='order-table'>
        <div className='order-header'>
          <div className='order-row'>
            <div className='order-cell order-id'>ID</div>
            <div className='order-cell order-time'>Ngày đặt hàng</div>
            <div className='order-cell order-total'>Tổng tiền</div>
            <div className='order-cell order-address'>Địa chỉ</div>
            <div className='order-cell order-status'>TT giao hàng</div>
            <div className='order-cell order-status'>TT thanh toán</div>
          </div>
        </div>
        <div className='order-body'>
          {dataOrder &&
            dataOrder.map((item) => (
              <div
                className='order-item'
                key={item._id}
                onClick={(e) => navigator(`/orders/${item._id}`)}
              >
                <div className='order-row'>
                  <div className='order-cell order-id'>
                    #{item._id.substr(-5)}
                  </div>
                  <div className='order-cell order-time'>
                    {moment(item.createdAt).format('DD-MM-YYYY').toString()}
                  </div>
                  <div className='order-cell order-total'>
                    {item.total.toLocaleString()}đ
                  </div>
                  <div className='order-cell order-address'>{item.address}</div>
                  <div className='order-cell order-status'>
                    {item.statusShipping ? (
                      <span className='badge order-status-noti-complete'>
                        Đã giao hàng
                      </span>
                    ) : (
                      <span className='badge order-status-noti'>
                        Chờ xác nhận
                      </span>
                    )}
                  </div>
                  <div className='order-cell order-status'>
                    {item.statusPayment ? (
                      <span className='badge order-status-noti-complete'>
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className='badge order-status-noti'>
                        Chờ thanh toán
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
