import UserNav from './UserNav';
import '../../styles/pages/UserPage.scss';
import { useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../../default-value';

const ChangePassword = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  const submitPassword = async () => {
    if (passwordForm.newPassword !== passwordForm.reNewPassword)
      return alert('Mật khẩu mới và xác nhận mật khẩu không giống nhau');
    try {
      const res = await axios.put(
        `${API_LINK}/user/updatePassword`,
        passwordForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className='userpage'>
      <div className='user__info container'>
        <div className='user__info-header'>
          <h1>Thay đổi mật khẩu</h1>
          <div>Quản lý mật khẩu để bảo mật tài khoản</div>
        </div>
        <div className='user__info-body'>
          <div className='user__info-form'>
            <div className='input-field'>
              <span className='input-title'>Mật khẩu cũ</span>
              <input
                type='password'
                className='input-text'
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className='input-field'>
              <span className='input-title'>Mật khẩu mới</span>
              <input
                type='password'
                className='input-text'
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className='input-field'>
              <span className='input-title'>Xác nhận mật khẩu mới</span>
              <input
                type='password'
                className='input-text'
                value={passwordForm.reNewPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    reNewPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className='input-field'>
              <span className='input-title'></span>
              <div
                className='button button-submit'
                style={{ marginLeft: 0 }}
                onClick={() => submitPassword()}
              >
                Lưu
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserNav />
    </div>
  );
};

export default ChangePassword;
