import '../../styles/sections/orderpage/OrderItem.scss';

const OrderItem = ({ item, setOpen }) => {
  return (
    <div className='orderlist__item'>
      <div
        className='item__img'
        style={{ backgroundImage: `url(${item.product.image})` }}
      ></div>
      <div className='item__description'>
        <div className='item__name'>{item.product.name}</div>
        <div className='item__price'>
          {item.product.price.toLocaleString()}đ x {item.quantity}
        </div>
        <div className='item__total-price'>
          {(item.product.price * item.quantity).toLocaleString()}đ
        </div>
      </div>
      <div className='button button-submit' onClick={(e) => setOpen(item.product._id)}>
        Đánh giá
      </div>
    </div>
  );
};

export default OrderItem;
