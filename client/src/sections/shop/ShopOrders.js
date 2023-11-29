import '../../styles/sections/shop/ShopInfomation.scss';
import '../../styles/sections/shop/ShopOrders.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_LINK } from '../../default-value';
import ShopNav from './ShopNav';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const ShopOrders = () => {
  const [dataShop, setDataShop] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const shop = useSelector((state) => state.shop);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_LINK}/order/shop/${shop.shop._id}`, {
        params: { start, end },
      });
      setDataShop(res.data.order);
    } catch (error) {
      console.log('Lỗi ở fetchData', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='shopinfo'>
      <div className='container shopinfo__box'>
        <div className='shopinfo__content'>
          <h3>TẤT CẢ ĐƠN HÀNG</h3>
          <div className='date-picker'>
            <DatePicker onChange={setStart} value={start} />
            <DatePicker onChange={setEnd} value={end} className={'ms-4'} />
            <div className='btn-filter ms-4' onClick={(e) => fetchData()}>
              Tìm kiếm
            </div>
          </div>
          <div className='shopinfo__table-header'>
            <table>
              <colgroup>
                <col width={400} />
                <col width={169} />
                <col width={169} />
                <col width={169} />
                <col width={169} />
                <col width={170} />
              </colgroup>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Mã đơn hàng</th>
                  <th>Số lượng</th>
                  <th>Tổng đơn hàng</th>
                  <th>Trạng thái giao hàng</th>
                  <th>Trạng thái thanh toán</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='shopinfo__table-body'>
            <table>
              <colgroup>
                <col width={400} />
                <col width={169} />
                <col width={169} />
                <col width={169} />
                <col width={169} />
                <col width={170} />
              </colgroup>
              <tbody>
                {dataShop &&
                  dataShop.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productInfo.name}</td>
                      <td>#{item._id.substr(-5)}</td>
                      <td>{item.list.quantity}</td>
                      <td>
                        {(
                          item.productInfo.price * item.list.quantity
                        ).toLocaleString()}
                        đ
                      </td>
                      <td>
                        {item.statusShipping ? (
                          <span className='badge order-status-noti-complete'>
                            Đã giao hàng
                          </span>
                        ) : (
                          <span className='badge order-status-noti'>
                            Chờ xác nhận
                          </span>
                        )}
                      </td>
                      <td>
                        {item.statusPayment ? (
                          <span className='badge order-status-noti-complete'>
                            Đã thanh toán
                          </span>
                        ) : (
                          <span className='badge order-status-noti'>
                            Chờ thanh toán
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ShopNav />
    </div>
  );
};

export default ShopOrders;
