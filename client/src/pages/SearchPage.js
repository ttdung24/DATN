import { useLocation } from 'react-router-dom';
import ProductList from '../sections/homepage/ProductList';
import '../styles/pages/SearchPage.scss';

const SearchPage = () => {
  const location = useLocation();
  const myQuery = new URLSearchParams(location.search).get('q');
  
  return (
    <div className='searchpage'>
      <ProductList search={myQuery} />
    </div>
  );
};

export default SearchPage;
