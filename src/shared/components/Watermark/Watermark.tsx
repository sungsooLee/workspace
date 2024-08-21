// const Watermark = ({
//   width,
//   height,
//   text,
//   opacity = 0.15,
//   fontSize = '3em',
//   rotate = '-30',
// }: any) => {
//   const rows = [];
//   for (let i = 0; i < 20; i++) {
//     rows.push(
//       <div
//         key={i}
//         className='transform whitespace-nowrap uppercase'
//         style={{
//           color: `rgba(255, 255, 255, ${opacity})`,
//           fontSize: fontSize,
//           transform: `rotate(${rotate}deg)`,
//           //   marginLeft: 'auto',
//         }}
//       >
//         {text} {text} {text} {text} {text} {text} {text} {text} {text} {text}
//         {text} {text} {text} {text} {text} {text}
//         {text} {text} {text} {text} {text} {text} {text} {text}
//       </div>
//     );
//   }

//   return (
//     <div className='relative' style={{ width, height }}>
//       {/* <img src={src} alt="Watermark" className="absolute inset-0 w-full h-full object-cover" /> */}
//       <div className='space absolute inset-0 flex flex-col items-center justify-center space-x-[200px] space-y-[200px]'>
//         {rows}
//       </div>
//     </div>
//   );
// };

// export default Watermark;

const Watermark = ({
  width,
  height,
  text,
  fontSize = '3em',
  rotate = '-30',
  letterSpacing = '0.5em', // 추가된 글자 간격 조절
  horizontalSpacing = '100px',
  verticalSpacing = '100px',
}: any) => {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <div
        key={i}
        className='whitespace-nowrap'
        style={{
          color: `rgba(255, 255, 255, 0.03)`,
          fontSize: fontSize,
          transform: `rotate(${rotate}deg)`,
          letterSpacing: letterSpacing,
        }}
      >
        {Array(30).fill(text).join('    ')}
      </div>
    );
  }

  return (
    <div className='relative' style={{ width, height }}>
      <div
        className='space absolute inset-0 flex flex-col items-center justify-center'
        style={{
          gap: `${verticalSpacing} ${horizontalSpacing}`,
        }}
      >
        {rows}
      </div>
    </div>
  );
};

export default Watermark;
