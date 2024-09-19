import { useNavigate } from 'react-router-dom';
import { Drawer } from 'vaul';

const LnbDrawer = ({ open, setOpen, items }: any) => {
  const navigate = useNavigate();

  const changeRoute = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <Drawer.Root direction='left' open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='fixed bottom-0 left-0 mt-24 flex h-full w-[400px] flex-col rounded-t-[10px] bg-white'>
          <div className='h-full flex-1 bg-white p-4'>
            <div className='mx-auto max-w-md'>
              <Drawer.Title className='mb-4 font-medium'></Drawer.Title>
              <Drawer.Description>
                {items &&
                  items.map((item: any) => (
                    <div
                      key={item.id}
                      className={`block cursor-pointer p-2 hover:text-blue-500`}
                      onClick={() => {
                        changeRoute(item.link);
                        setOpen(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LnbDrawer;
