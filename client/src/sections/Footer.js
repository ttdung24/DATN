import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className="footer__policy">
            <span>CHÍNH SÁCH BẢO MẬT</span>
            <span>QUY CHẾ HOẠT ĐỘNG</span>
            <span>CHÍNH SÁCH VẬN CHUYỂN</span>
            <span>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
        </div>
        <div className='company-info mb-24'>Công ty TNHH DShop</div>
        <div className='company-info'>Địa chỉ: 77 Bùi Xương Trạch, Phường Khương Đình, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 1900xxxx - Email: cskh@hotro.dshop.vn</div>
        <div className='company-info'>Chịu Trách Nhiệm Quản Lý Nội Dung: Tô Tiến Dũng - Điện thoại liên hệ: 0795256013</div>
        <div className='company-info'>Mã số doanh nghiệp: 010677xxxx do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 20/10/2023</div>
        <div className='company-info'>© 2023 - Bản quyền thuộc về Công ty TNHH DShop</div>
      </div>
    </div>
  );
};

export default Footer;
