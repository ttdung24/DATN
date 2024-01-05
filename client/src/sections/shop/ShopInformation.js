import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/sections/shop/ShopInfomation.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_LINK } from '../../default-value';
import ShopNav from './ShopNav';

const ShopInformation = () => {
  const navigator = useNavigate();
  const { state } = useLocation();
  const [dataShop, setDataShop] = useState(null);
  const shop = useSelector((state) => state.shop);
  const fetchProductOfShop = async () => {
    const res = await axios.get(`${API_LINK}/product/shop/${shop.shop._id}`, {
      params: {
        status: state ? state.status : 'true',
      },
    });
    setDataShop(res.data.product);
  };
  useEffect(() => {
    fetchProductOfShop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeStatusProduct = async (e, id) => {
    e.stopPropagation();
    const res = await axios.put(`${API_LINK}/product/${id}`, {
      status: state ? true : false,
    });
    console.log(res.data.message);
    fetchProductOfShop();
  };

  return (
    <div className='shopinfo'>
      <div className='container shopinfo__box'>
        <div className='shopinfo__content'>
          <h3>TẤT CẢ MẶT HÀNG</h3>
          <div
            className='btn-add'
            onClick={(e) => {
              navigator('/shop/add');
            }}
          >
            Thêm
          </div>
          <div className='shopinfo__table-header'>
            <table>
              <colgroup>
                <col width={400} />
                <col width={150} />
                <col width={250} />
                <col width={150} />
                <col width={150} />
                <col width={150} />
              </colgroup>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Nhãn</th>
                  <th>Số lượng</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='shopinfo__table-body'>
            <table>
              <colgroup>
                <col width={400} />
                <col width={150} />
                <col width={250} />
                <col width={150} />
                <col width={150} />
                <col width={150} />
              </colgroup>
              <tbody>
                {dataShop &&
                  dataShop.map((item) => (
                    <tr
                      key={item._id}
                      onClick={() => navigator(`/shop/edit/${item._id}`)}
                    >
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <div
                          className='btn-delete'
                          onClick={(e) => changeStatusProduct(e, item._id)}
                        >
                          {state ? 'Khôi phục' : 'Xóa'}
                        </div>
                      </td>
                      <td>
                        <div
                          className='btn-delete'
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator(`/shop/reviews/${item._id}`);
                          }}
                        >
                          Xem đánh giá
                        </div>
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

export default ShopInformation;
