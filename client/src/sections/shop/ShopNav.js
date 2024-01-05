import '../../styles/sections/shop/ShopNav.scss';
import { useNavigate } from 'react-router-dom';

const ShopNav = () => {
  const navigator = useNavigate();
  return (
    <div className='shopinfo__nav'>
      <ul className='nav__list'>
        <li className='nav__item' onClick={(e) => navigator('/shop')}>
          Quản lý sản phẩm
        </li>
        <li
          className='nav__item'
          onClick={(e) =>
            navigator('/shop/restore-product', {
              state: {
                status: false,
              },
            })
          }
        >
          Sản phẩm lưu trữ
        </li>
        <li className='nav__item' onClick={(e) => navigator('/shop/orders')}>
          Quản lý đơn hàng
        </li>
        <li
          className='nav__item'
          onClick={(e) => navigator('/shop/statistics')}
        >
          Thống kê doanh số
        </li>
      </ul>
    </div>
  );
};

export default ShopNav;
