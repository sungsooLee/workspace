import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../types';

interface LNBProps {
  items: MenuItem[];
  isOpen: boolean;
  toggleOpen: () => void;
}

const LNB = ({ items, isOpen, toggleOpen }: LNBProps) => {
  const navigate = useNavigate();

  const changeRoute = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <div
      className={`relative ${
        isOpen ? 'w-264pxr' : 'w-0pxr'
      } transition-all duration-300 `}
    >
      <div
        id='lnb'
        className={`bg-lnb h-full overflow-y-auto border-r-2 border-black`}
      >
        <button
          onClick={toggleOpen}
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
                  className={`block p-2 cursor-pointer hover:text-blue-500 `}
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
