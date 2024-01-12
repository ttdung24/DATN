import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/SignIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/apiCall';
import axios from 'axios';
import { API_LINK } from '../default-value';
import { login } from '../store/slice/accountSlice';

const SignIn = () => {
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  });

  const refreshToken = localStorage.getItem('refreshToken');
  // eslint-disable-next-line
  const account = useSelector((state) => state.account);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleSingIn = () => {
    if (!userForm.username || !userForm.password) {
      alert('Điền đẩy đủ username và mật khẩu');
      return;
    }

    if (userForm.password.length < 8) {
      alert('Mật khẩu phải dài hơn 8 kí tự');
      return;
    }

    signIn(dispatch, userForm);
    navigator('/homepage');
  };
  useEffect(() => {
    const signInWithRefToken = async () => {
      try {
        const res = await axios.post(`${API_LINK}/auth/refreshtoken`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        dispatch(login(res.data.accessToken));
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('role', res.data.role);
        navigator('/homepage');
      } catch (error) {
        console.log(error);
      }
    };
    if (refreshToken) {
      signInWithRefToken();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='signIn d-flex justify-content-center align-items-center'>
      <div className='signIn__form'>
        <h1>LOGIN</h1>
        <form>
          <div className='input_field'>
            <label className='form-label' htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              required
              className='form-control'
              value={userForm.username}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className='input_field'>
            <label className='form-label' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              required
              className='form-control'
              value={userForm.password}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  password: e.target.value,
                })
              }
            />
          </div>
        </form>
        <div className='login-button' onClick={(e) => handleSingIn()}>
          Sign in
        </div>
        <div className='register__action'>
          <span>I don't have an account? </span>
          <Link to={'/register'} className='signup'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
