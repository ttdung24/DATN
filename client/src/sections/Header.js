import '../styles/Header.scss';
import { CgShoppingCart } from 'react-icons/cg';
import { AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/accountSlice';
import { getInfomation } from '../store/apiCall';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  const handleSignOut = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout(''));
    navigator('/');
  };

  useEffect(() => {
    if (account.accessToken) {
      getInfomation(dispatch, account.accessToken);
    }
  }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='header'>
      <div className='container d-flex'>
        <div className='header__logo' onClick={() => navigator('/homepage')}>
          <h1>DSHOP</h1>
        </div>
        <div className='header__search flex-grow-1'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <div className='header__search-icon'>
            <Link
              to={{
                pathname: '/search',
                search: `?q=${query}`,
              }}
            >
              <AiOutlineSearch color='white' />
            </Link>
          </div>
        </div>
        <div className='header__other'>
          <div className='header__cart' onClick={(e) => navigator('/cart')}>
            <CgShoppingCart className='header__icon' />
          </div>
          <div className='header__user'>
            <AiOutlineUser className='header__icon' />
            <div className='user__popup'>
              <div className='selection'>Thông tin cá nhân</div>
              <div className='selection' onClick={(e) => navigator('/shop')}>
                Shop
              </div>
              <div className='selection' onClick={(e) => navigator('/orders')}>
                Đơn hàng
              </div>
              <div className='selection' onClick={(e) => handleSignOut()}>
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
