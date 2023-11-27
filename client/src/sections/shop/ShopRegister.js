import { useState } from 'react';
import '../../styles/sections/shop/ShopRegister.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { API_LINK } from '../../default-value';
import { getShop } from '../../store/slice/shopSlice';
import axios from 'axios';

const ShopRegister = () => {
  const [shopForm, setShopForm] = useState({
    name: '',
    fullname: '',
    address: '',
    phone: '',
  });

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState('0');
  const [message, setMessage] = useState('Loading...');
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setCheck('0');
    setOpen(true);
    try {
      const res = await axios.post(`${API_LINK}/shop/create`, shopForm, {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
      });
      dispatch(getShop(res.data.shop));
      setMessage(res.data.message);
      setCheck('1');
    } catch (error) {
      setMessage(error.response.data.message);
      setCheck('2');
    }
  };

  return (
    <>
      <div className='shopregister container'>
        <div className='shopreg__header'>
          <h3>ĐĂNG KÍ BÁN HÀNG</h3>
        </div>
        <div className='shopreg__content'>
          <div className='input-field'>
            <span>Tên Shop</span>
            <input
              type='text'
              value={shopForm.name}
              onChange={(e) =>
                setShopForm({ ...shopForm, name: e.target.value })
              }
            />
          </div>
          <div className='input-field'>
            <span>Họ và tên</span>
            <input
              type='text'
              value={shopForm.fullname}
              onChange={(e) =>
                setShopForm({ ...shopForm, fullname: e.target.value })
              }
            />
          </div>
          <div className='input-field'>
            <span>Địa chỉ nhận hàng</span>
            <input
              type='text'
              value={shopForm.address}
              onChange={(e) =>
                setShopForm({ ...shopForm, address: e.target.value })
              }
            />
          </div>
          <div className='input-field'>
            <span>Số điện thoại</span>
            <input
              type='text'
              value={shopForm.phone}
              onChange={(e) =>
                setShopForm({ ...shopForm, phone: e.target.value })
              }
            />
          </div>
        </div>
        <div className='shopreg__button'>
          <div className='button button-cancel'>Hủy</div>
          <div className='button button-submit' onClick={(e) => handleSubmit()}>
            Hoàn tất
          </div>
        </div>
      </div>
      {open && (
        <div className='shopreg__popup'>
          <div className='popup__box'>
            <div className='popup__icon'>
              {
                {
                  0: <AiOutlineLoading3Quarters style={{ color: 'gray' }} />,
                  1: <GoIssueClosed style={{ color: 'green' }} />,
                  2: <IoIosCloseCircleOutline style={{ color: 'red' }} />,
                }[check]
              }
            </div>
            <div className='popup__message'>{message}</div>
            <div
              className='button button-submit'
              onClick={(e) => setOpen(false)}
            >
              Done
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopRegister;
