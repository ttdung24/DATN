import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/SignUp.scss';
import axios from 'axios';
import { API_LINK } from '../default-value';

const SignUp = () => {
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
  });

  const navigator = useNavigate();

  const handleSingUp = async () => {
    try {
      const res = await axios.post(`${API_LINK}/user/create`, userForm);
      alert(res.data.message);
      navigator('/');
    } catch (error) {
      alert("Tạo tài khoản thất bại");
      console.log('Loi o handle SignUp: ', error)
    }
  };

  return (
    <div className='signUp d-flex justify-content-center align-items-center'>
      <div class='signUp__form'>
        <h1 className=''>REGISTER</h1>
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
            <label className='form-label' htmlFor='fullname'>
              Fullname
            </label>
            <input
              type='text'
              name='fullname'
              id='fullname'
              required
              className='form-control'
              value={userForm.fullname}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  fullname: e.target.value,
                })
              }
            />
          </div>
          <div className='input_field'>
            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              type='text'
              name='email'
              id='email'
              required
              className='form-control'
              value={userForm.email}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  email: e.target.value,
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
        <div className='register-button' onClick={(e) => handleSingUp()}>
          Sign up
        </div>
        <div className='login__action'>
          <span>You have an account? </span>
          <Link to={'/'} className='signin'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
