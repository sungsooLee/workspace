import { Button } from '@/shared/components/Button/button';
import { KitContainer, KitProps } from '@/widgets/kit/ui/KitContainer';
import { useState } from 'react';

export const KitPage = () => {
  const kitArr: KitProps[] = [{ kitId: 2, now: Date.now() }];

  const [kit, setKit] = useState<KitProps | null>(null);

  const getKit = (props: any) => {
    setKit(props);
  };

  return (
    <>
      {kitArr.map((item) => {
        return (
          <div key={item.kitId} className='flex flex-col items-center'>
            <Button onClick={() => getKit(item)} className='m-10'>
              {item.kitId} 키트
            </Button>
          </div>
        );
      })}
      <div>
        샘플 키트
        {kit && <KitContainer {...kit} />}
      </div>
    </>
  );
};
