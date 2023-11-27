import { useSelector } from 'react-redux';
import ShopRegister from '../sections/shop/ShopRegister';
import '../styles/pages/Shop.scss';
import ShopInformation from '../sections/shop/ShopInformation';

const Shop = () => {
  const shop = useSelector((state) => state.shop);
  return (
    <div className='shop'>{Object.keys(shop?.shop).length ? <ShopInformation /> : <ShopRegister />}</div>
  );
};

export default Shop;
