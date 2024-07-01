import { Link, useNavigate } from 'react-router-dom';
import { MenuItem } from '../types';

interface LNBProps {
  items: MenuItem[];
}

const LNB = ({ items }: LNBProps) => {
  const navigate = useNavigate();

  const changeRoute = (link: string) => {
    console.log(link);
    navigate(`/${link}`);
  };

  return (
    <div className='relative'>
      <div
        id='lnb'
        className={`bg-lnb h-full overflow-y-auto w-[264px] fixed `}
      >
        <nav>
          {items &&
            items.map((item) => (
              <p
                key={item.id}
                className='block p-2'
                onClick={() => {
                  changeRoute(item.link);
                }}
              >
                {item.name}
              </p>
            ))}
        </nav>
      </div>
      {/*
        접었다 폈다 할 수 있는 버튼 아이콘 필요. 사이드 바랑 붙어있게 구현하고 싶음.
      */}
      {/* <Button
        className={`absolute w-[24px] h-[40px] top-1/4 ${isOpen ? 'right-[20px]' : '-right-[288px]'} transform bg-white border rounded p-1 shadow-md flex justify-center items-center`}
        size='icon'
        onClick={toggleLNB}
      >
        <img
          src='/assets/icons/ic_chevron-left-double.svg'
          className={`h-4 w-4 text-gray-700 transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </Button> */}
    </div>
  );
};

export default LNB;
