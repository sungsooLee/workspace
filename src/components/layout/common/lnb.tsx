import { Link, useNavigate } from 'react-router-dom';
import { MenuItem } from '../types';
import { useState } from 'react';

interface LNBProps {
  items: MenuItem[];
}

const LNB = ({ items }: LNBProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const changeRoute = (link: string) => {
    navigate(`/${link}`);
  };

  const toggleLNB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative transition-width	duration-300 ${
        isOpen ? 'w-[264px]' : 'w-[0px]'
      } `}
    >
      <div id='lnb' className={`bg-lnb h-full overflow-y-auto`}>
        <button
          onClick={toggleLNB}
          className={`absolute top-2 right-[-20px] bg-gray-800 text-white p-1 rounded`}
        >
          {isOpen ? '<' : '>'}
        </button>
        {isOpen && (
          <nav>
            {items &&
              items.map((item) => (
                <p
                  key={item.id}
                  className='block p-2 cursor-pointer'
                  onClick={() => {
                    changeRoute(item.link);
                  }}
                >
                  {item.name}
                </p>
              ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default LNB;
