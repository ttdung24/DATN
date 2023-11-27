import { useSelector } from 'react-redux';
import '../../styles/sections/homepage/Category.scss';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const category = useSelector((state) => state.category);
  const navigator = useNavigate()
  return (
    <div className='category container'>
      <div className='category__header'>Danh mục</div>
      <div className='category__content'>
        <ul className='item-list'>
          {category.category.map((item) => (
            <li className='item' key={item._id}>
              <div className='item__box' onClick={() => navigator(`/category/${item.slug}`)}>
                <div className='item__img' style={{backgroundImage: `url(${item.image})`}}></div>
                <div className='item__name'>{item.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
