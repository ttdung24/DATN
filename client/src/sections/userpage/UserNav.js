import '../../styles/sections/shop/ShopNav.scss';
import { useNavigate } from 'react-router-dom';

const UserNav = () => {
  const navigator = useNavigate();
  return (
    <div className='shopinfo__nav'>
      <ul className='nav__list'>
        <li className='nav__item' onClick={(e) => navigator('/user')}>
          Thông tin cá nhân
        </li>
        <li className='nav__item' onClick={(e) => navigator('/user/password')}>
          Đổi mật khẩu
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
