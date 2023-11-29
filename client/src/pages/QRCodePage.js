import { useParams } from 'react-router-dom';
import '../styles/pages/QRCodePage.scss';
const QRCodePage = () => {
  const { id } = useParams();
  return (
    <div className='qrpage container'>
      <div className='qrpage__title'>Chuyển khoản</div>
      <div className='qrpage__body'>
        <ol className='qrpage__tutor'>
          <li>
            Vào ứng dụng ngân hàng của bạn trên điện thoại và chọn chức năng
            quét mã QR trong đó
          </li>
          <li>Quét mã QR bên dưới</li>
          <li>Nhập số tiền bạn cần chuyển</li>
          <li>Nội dung chuyển tiền: DON HANG {id.substr(-5)}</li>
          <li>
            Hoàn tất quá trình chuyển tiền (tên người nhận tiền là TO TIEN DUNG).
            Sau khoảng 1, 2 phút đơn hàng của bạn sẽ được thanh toán.
          </li>
        </ol>
        <div className='qrpage__img'></div>
      </div>
    </div>
  );
};

export default QRCodePage;
