import { useEffect, useState } from 'react';
import '../../styles/sections/shop/AddProduct.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { API_LINK } from '../../default-value';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_LINK}/product/${id}`);
        setProductForm({ ...productForm, ...res.data.product });
      } catch (error) {
        console.log('Lỗi ở fetchProduct:', error);
      }
    };
    fetchProduct();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [check, setCheck] = useState('0');
  const [message, setMessage] = useState('Loading...');
  const category = useSelector((state) => state.category);

  const handleSubmit = async () => {
    setCheck('0');
    setOpen(true);
    try {
      if (
        !productForm.description ||
        !productForm.price ||
        !productForm.name ||
        !productForm.quantity ||
        !productForm.category
      ) {
        alert('Điền đẩy đủ thông tin các trường');
        return;
      }
      let updateProduct = { ...productForm };
      if (selectedImage) {
        const fileName =
          uuidv4() +
          selectedImage.name.substring(selectedImage.name.lastIndexOf('.'));
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(snapshot.ref);
        updateProduct = {
          ...productForm,
          image: downloadURL,
        };
      }
      const res = await axios.put(
        `${API_LINK}/product/${productForm._id}`,
        updateProduct
      );
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
          <h3>CHỈNH SỬA SẢN PHẨM</h3>
        </div>
        <div className='shopreg__content'>
          <div className='input-field'>
            <span>Tên sản phẩm</span>
            <input
              type='text'
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
            />
          </div>
          <div className='input-field'>
            <span>Ảnh</span>
            {productForm.image || selectedImage ? (
              <div>
                <img
                  alt='not found'
                  width={'250px'}
                  src={
                    productForm.image
                      ? productForm.image
                      : URL.createObjectURL(selectedImage)
                  }
                />
                <br />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setProductForm({ ...productForm, image: '' });
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type='file'
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            )}
          </div>
          <div className='input-field'>
            <span>Nhãn</span>
            <select
              className='form-select'
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
            >
              <option value='0'>Chọn nhãn</option>
              {category.category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='input-field'>
            <span>Thông tin chi tiết</span>
            <textarea
              type='text'
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className='input-field'>
            <span>Giá</span>
            <input
              rows='10'
              cols='30'
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
            />
          </div>
          <div className='input-field'>
            <span>Số lượng còn lại</span>
            <input
              type='text'
              value={productForm.quantity}
              onChange={(e) =>
                setProductForm({ ...productForm, quantity: e.target.value })
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

export default EditProduct;
