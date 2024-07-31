interface BadgeProps {
  // status
  children: React.ReactNode;
  type?: string;
}

const ThumbnailBadge: React.FC<BadgeProps> = ({
  type = 'default',
  children,
}) => {
  const bgColor = type === 'default' ? 'bg-point-light_blue' : 'bg-point-blue';

  return (
    <div
      className={`align-center absolute left-0 top-0 z-10 flex h-20pxr ${bgColor} px-4pxr duration-500 group-hover:translate-y-[-10px]`}
    >
      <p className='text-shadow text-[13px] font-normal leading-[20px] tracking-[-0.325px] text-white'>
        {children}
      </p>
    </div>
  );
};

export default ThumbnailBadge;
