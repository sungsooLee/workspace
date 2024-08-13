import React, { useRef, useState } from 'react';
import { Subtitle } from '../../model/model';

type SubtitlesProps = {
  subtitles: Subtitle[];
  selectedSubtitle: string;
  onSubtitleChange: (label: string) => void;
};

const SubtitlesSelect = React.memo(
  ({ subtitles, selectedSubtitle, onSubtitleChange }: SubtitlesProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const subtitleDropdownRef = useRef<HTMLDivElement>(null);

    const handleSubtitleDropdownBlur = (
      e: React.FocusEvent<HTMLDivElement>
    ) => {
      if (!subtitleDropdownRef.current?.contains(e.relatedTarget as Node)) {
        setShowDropdown(false);
      }
    };

    const handleSubtitleDropdownToggle = () => {
      setShowDropdown((prev) => !prev);
    };

    return (
      <>
        <div
          className='relative'
          ref={subtitleDropdownRef}
          onBlur={handleSubtitleDropdownBlur}
        >
          <button
            onClick={handleSubtitleDropdownToggle}
            className='rounded border border-white px-2 text-white'
            aria-haspopup='listbox'
          >
            CC
          </button>
          {showDropdown && (
            <ul
              className='absolute bottom-full right-0 mb-1 mt-1 rounded border border-gray-700 bg-black shadow-lg'
              role='listbox'
              tabIndex={-1}
            >
              {subtitles.map((subtitle: Subtitle) => (
                <li
                  key={subtitle.label}
                  onClick={() => {
                    onSubtitleChange(subtitle.label);
                    setShowDropdown(false);
                  }}
                  className={`cursor-pointer text-white ${selectedSubtitle == subtitle.label ? 'bg-gray-700 font-bold' : ''}`}
                  role='option'
                >
                  {subtitle.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
);

export default SubtitlesSelect;
