import { useNavigate, useParams } from 'react-router-dom';
import ProductList from '../sections/homepage/ProductList';
import '../styles/pages/ProductCategory.scss';
import { useSelector } from 'react-redux';

const ProductCategory = () => {
  const { slug } = useParams();
  let cateInfor = null;
  const category = useSelector((state) => state.category);
  const navigator = useNavigate();
  for (let item of category.category) {
    if (item.slug === slug) {
      cateInfor = item;
    }
  }

  return (
    <div className='product-category'>
      <nav aria-label='breadcrumb' className='container'>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item' onClick={() => navigator('/homepage')}>
            <span>Home</span>
          </li>
          <li class='breadcrumb-item active' aria-current='page'>
            {cateInfor.name}
          </li>
        </ol>
      </nav>
      <ProductList category={cateInfor._id} />
    </div>
  );
};

export default ProductCategory;
