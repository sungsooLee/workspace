import { CheckCircle, Circle, X } from 'lucide-react';
import { useState } from 'react';
import { PlayerContainerProps } from '../types';

const CurriculumSidebar = ({
  toggleCurriculumSection,
}: Pick<PlayerContainerProps, 'toggleCurriculumSection'>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sideMenu = [
    {
      type: 'section',
      title: '소콤오기니제이션소콤오기니제이션소콤오기니제이션...',
      duration: '15:40',
      items: [
        { label: '소콤아이템 1', duration: '4:11', completed: true },
        { label: '소콤아이템 2', duration: '1:02', completed: true },
        { label: '소콤아이템 3', duration: '2:04', completed: true },
        { label: '소콤아이템 4', duration: '3:01', completed: false },
        { label: '소콤아이템 5', duration: '5:22', completed: false },
      ],
    },
    {
      type: 'module',
      title: '모듈명',
      duration: '25:13',
      items: [
        { label: '레슨 1 동영상', duration: '4:11', completed: true },
        { label: '레슨 2 이북', duration: '4:11', completed: false },
      ],
    },
    {
      type: 'quiz',
      title: '퀴즈',
      duration: '6:00',
      items: [
        { label: '퀴즈 1', duration: '3:00', completed: false },
        { label: '퀴즈 2', duration: '3:00', completed: false },
      ],
    },
    {
      type: 'module',
      title: '모듈명',
      items: [
        { label: '레슨명 1', duration: '', link: true, completed: false },
        {
          label: '레슨명 2 레슨명 2 레슨명 2 레슨명 2',
          duration: '',
          link: true,
          completed: true,
        },
      ],
    },
  ];

  return (
    <aside className="h-screen w-1/4 border-r bg-white text-[#111]">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-4">
        <h2 className="text-lg font-semibold">커리큘럼</h2>
        <X className="h-5 w-5 cursor-pointer" onClick={toggleCurriculumSection} />
      </div>

      {/* Content */}
      <div className="overflow-y-auto px-4 pb-4">
        {sideMenu.map((section, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between border-b py-2 text-sm font-medium text-gray-600">
              <span>{section.title}</span>
              {section.duration && <span>{section.duration}</span>}
            </div>
            <ul className="mt-2 space-y-2">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center justify-between rounded px-2 py-1 hover:bg-gray-100 ${
                    activeIndex === idx * 10 + i ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveIndex(idx * 10 + i)}
                >
                  <div className="flex items-center gap-2 text-sm">
                    {item.completed ? (
                      <CheckCircle className="h-4 w-4 text-sky-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="truncate">{item.label}</span>
                    {/* {item.link && <span className="ml-1 text-xs text-blue-500">↗</span>} */}
                  </div>
                  {item.duration && <span className="text-xs text-gray-500">{item.duration}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CurriculumSidebar;
