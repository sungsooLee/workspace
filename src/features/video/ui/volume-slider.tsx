// import { useState } from 'react';
// import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
// import ReactPlayer from 'react-player';

// type VolumeSliderProps = {
//   ref: React.RefObject<ReactPlayer>;
// };

// const VolumeSlider: React.FC<VolumeSliderProps> = ({ ref }) => {
//   const [volume, setVolume] = useState(0.5);
//   const [muted, setMuted] = useState(false);
//   const [showVolumeSlider, setShowVolumeSlider] = useState(false);

//   const handleVolumeChange = (value: number) => {
//     // if (!playerRef) return;
//     console.log(ref);
//     if (ref && ref.current) {
//       const player = ref.current;
//       console.log(player);
//       player.getInternalPlayer().volume = value;
//       // playerRef.current = (value);
//     }
//   };

//   return (
//     <div
//       className='relative mr-2 flex items-center'
//       onMouseEnter={() => setShowVolumeSlider(true)}
//       onMouseLeave={() => setShowVolumeSlider(false)}
//     >
//       <button
//         // onClick={onVolumeToggle}
//         className='text-white'
//         aria-label={muted ? 'Unmute' : 'Mute'}
//       >
//         {muted ? <FaVolumeMute /> : <FaVolumeUp />}
//       </button>
//       <div
//         className={`absolute left-full top-1/2 ml-2 -translate-y-1/2 transform bg-opacity-100 p-1 transition-all duration-300 ease-in-out ${
//           showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
//         }`}
//         style={{ transformOrigin: 'left', zIndex: 10 }}
//       >
//         <div className='volume-slider'>
//           <input
//             type='range'
//             min={0}
//             max={1}
//             step='0.01'
//             value={volume}
//             // onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
//             onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
//             className='h-1 w-16 cursor-pointer'
//             aria-label='Volume'
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VolumeSlider;
