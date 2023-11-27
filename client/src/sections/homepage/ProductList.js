import axios from 'axios';
import '../../styles/sections/homepage/ProductList.scss';
import { useEffect, useState } from 'react';
import { API_LINK } from '../../default-value';
import { useNavigate } from 'react-router-dom';

const ProductList = (props) => {
  const [dataProduct, setDataProduct] = useState();
  const [page, setPage] = useState(1);
  const navigator = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/product`, {
        params: {
          page: page,
          limit: 16,
          category: props.category,
          search: props.search,
        },
      });
      setDataProduct(res.data.product);
    };
    fetchData();
  }, [page, props.category, props.search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='productlist container'>
      <ul className='item-list'>
        {dataProduct &&
          dataProduct.map((item) => (
            <li className='item' key={item._id}>
              <div className='item__box' onClick={() => navigator(`/product/${item._id}`)}>
                <div className='item__img' style={{backgroundImage: `url(${item.image})`}}></div>
                <div className='item__info'>
                  <h2 className='item__name'>
                    {item.name}
                  </h2>
                  <span>₫</span>
                  <span>{item.price.toLocaleString()}</span>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <ul className='pagination page'>
        <li className='page-item'>
          <span className='page-link' onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</span>
        </li>
        <li className='page-item'>
          <span className='page-link'>{page}</span>
        </li>
        <li className='page-item'>
          <span className='page-link' onClick={() => setPage((prev) => prev + 1)}>Next</span>
        </li>
      </ul>
    </div>
  );
};

ProductList.defaultProps = {
  category: '',
  search: '',
};

export default ProductList;
