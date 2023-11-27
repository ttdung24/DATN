import Category from '../sections/homepage/Category';
import ProductList from '../sections/homepage/ProductList';
import '../styles/pages/HomePage.scss';

const HomePage = () => {
  return (
    <div className='homepage'>
      <Category />
      <ProductList />
    </div>
  );
};

export default HomePage;
