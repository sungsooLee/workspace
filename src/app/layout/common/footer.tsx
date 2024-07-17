const Footer = () => {
  return (
    <>
      <footer className='w-full bg-[#313131] px-[264px] py-[40px]'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <img
                src='/assets/icons/HAE_Logo.svg'
                className='self-start pr-[40px]'
              />
              <div className='flex flex-col'>
                <span className='footer flex flex-row gap-[48px] pb-[24px]'>
                  <p>사이트맵</p>
                  <p>이용약관</p>
                  <p>개인정보 처리방침</p>
                </span>
                <div className='flex flex-col'>
                  <span className='footer flex flex-row gap-[16px] pb-[8px]'>
                    <p>사업자등록번호 : 123-12-12345</p>
                    <p>통신판매업신고번호 : 제1234-서울강남-1234호</p>
                    <p>대표이사 : 홍길동</p>
                  </span>
                  <span className='footer flex flex-row'>
                    <p>주소 : 서울시 강남구 테헤란로 510</p>
                    <p>호스팅 서비스 제공 : 현대오토에버(주)</p>
                    <p>고객센터 : 080-600-6000, 080-200-6000</p>
                  </span>
                </div>
                <div>
                  <p className='flex pt-[32px] text-[#AAAAAA]'>
                    Copyright © 2023 Hyundai-Autoever. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='min-w-[200px]'>드랍다운</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
