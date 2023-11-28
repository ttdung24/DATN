import { useEffect, useState } from 'react';
import UserNav from '../sections/userpage/UserNav';
import '../styles/pages/UserPage.scss';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { API_LINK } from '../default-value';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const UserPage = () => {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    fullname: '',
    gender: 'nam',
  });
  const [birth, setBirth] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_LINK}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserForm({
          ...userForm,
          username: res.data.user.username,
          email: res.data.user.email,
          fullname: res.data.user.fullname,
          gender: res.data.user.gender,
          image: res.data.user.image,
        });
        setBirth(res.data.user.birth);
      } catch (error) {
        console.log('Lỗi ở fetchData', error);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateInfomation = async () => {
    try {
      let updateUser = { ...userForm, birth: birth.toString() };
      if (selectedImage) {
        const fileName =
          uuidv4() +
          selectedImage.name.substring(selectedImage.name.lastIndexOf('.'));
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(snapshot.ref);
        updateUser = {
          ...userForm,
          image: downloadURL,
        };
      }
      const res = await axios.put(`${API_LINK}/user/update`, updateUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUserForm(res.data.user);
      setBirth(res.data.user.birth);
      alert(res.data.message);
    } catch (error) {
      console.log('Lỗi ở update Infomation', error);
    }
  };

  return (
    <div className='userpage'>
      <div className='user__info container'>
        <div className='user__info-header'>
          <h1>Hồ Sơ Của Tôi</h1>
          <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className='user__info-body'>
          <div className='user__info-form'>
            <div className='input-field'>
              <span className='input-title'>Username</span>
              <input
                type='text'
                className='input-text'
                value={userForm.username}
                disabled={true}
              />
            </div>
            <div className='input-field'>
              <span className='input-title'>Họ và tên</span>
              <input
                type='text'
                className='input-text'
                value={userForm.fullname}
                onChange={(e) =>
                  setUserForm({ ...userForm, fullname: e.target.value })
                }
              />
            </div>
            <div className='input-field'>
              <span className='input-title'>Email</span>
              <input
                type='text'
                className='input-text'
                value={userForm.email}
                onChange={(e) =>
                  setUserForm({ ...userForm, email: e.target.value })
                }
              />
            </div>
            <div className='input-field'>
              <span className='input-title'>Giới tính</span>
              <div className='radio-button'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    id='nam'
                    checked={userForm.gender === 'nam'}
                    value='nam'
                    onChange={(e) =>
                      setUserForm({ ...userForm, gender: e.target.value })
                    }
                  />
                  <label className='form-check-label' htmlFor='nam'>
                    Nam
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    id='nu'
                    value='nu'
                    checked={userForm.gender === 'nu'}
                    onChange={(e) =>
                      setUserForm({ ...userForm, gender: e.target.value })
                    }
                  />
                  <label className='form-check-label' htmlFor='nu'>
                    Nữ
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    id='khac'
                    value='khac'
                    checked={userForm.gender === 'khac'}
                    onChange={setBirth}
                  />
                  <label className='form-check-label' htmlFor='khac'>
                    Khác
                  </label>
                </div>
              </div>
            </div>
            <div className='input-field'>
              <span className='input-title'>Ngày sinh</span>
              <DatePicker
                onChange={setBirth}
                value={birth}
                className={'input-birth'}
              />
            </div>
            <div className='input-field'>
              <span className='input-title'></span>
              <div
                className='button button-submit'
                style={{ marginLeft: 0 }}
                onClick={() => updateInfomation()}
              >
                Lưu
              </div>
            </div>
          </div>
          <div className='user__info-avatar'>
            <div className='avatar-wrap'>
              <div className='avatar-image'>
                {(userForm.image || selectedImage) && (
                  <div>
                    <img
                      alt='not found'
                      width={'100px'}
                      src={
                        userForm.image
                          ? userForm.image
                          : URL.createObjectURL(selectedImage)
                      }
                    />
                  </div>
                )}
                <label className='button-avatar'>
                  <input
                    type='file'
                    onChange={(e) => {
                      setUserForm({ ...userForm, image: '' });
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                  Chọn ảnh
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserNav />
    </div>
  );
};

export default UserPage;
