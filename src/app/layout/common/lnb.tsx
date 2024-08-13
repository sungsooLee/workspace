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
      } transition-all duration-300`}
    >
      <div
        id='lnb'
        className={`h-full overflow-y-auto border-r-2 border-primary-3 bg-white`}
      >
        <button
          onClick={toggleOpen}
          className={`absolute right-[-20px] top-2 rounded bg-gray-800 p-1 text-white`}
        >
          {isOpen ? '<' : '>'}
        </button>
        {isOpen && (
          <nav>
            {items &&
              items.map((item) => (
                <p
                  key={item.id}
                  className={`block cursor-pointer p-2 hover:text-blue-500`}
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
2;
