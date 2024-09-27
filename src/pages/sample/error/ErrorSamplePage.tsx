import { Error400 } from '@/shared/components/sample/Error/Error400';
import { Error4001 } from '@/shared/components/sample/Error/Error4001';
import { Error401 } from '@/shared/components/sample/Error/Error401';
import { Error403 } from '@/shared/components/sample/Error/Error403';
import { ErrorMutation } from '@/shared/components/sample/Error/ErrorMutation';
import { Tabs, TabsContent, TabsList } from '@/shared/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';

export const ErrorSamplePage = () => {
  return (
    <Tabs defaultValue='400' className='h-full w-full p-20'>
      <TabsList className='grid w-full grid-cols-5'>
        <TabsTrigger className='data-[state=active]:bg-white' value='400'>
          400
        </TabsTrigger>
        <TabsTrigger className='data-[state=active]:bg-white' value='401'>
          401
        </TabsTrigger>
        <TabsTrigger className='data-[state=active]:bg-white' value='403'>
          403
        </TabsTrigger>
        <TabsTrigger className='data-[state=active]:bg-white' value='Mutation'>
          Mutation
        </TabsTrigger>
      </TabsList>
      <TabsContent value='400' className='h-full w-full'>
        <div className='space-y-10 p-10'>
          <Error400 />
          <Error4001 />
        </div>
      </TabsContent>
      <TabsContent value='401' className='h-full w-full'>
        <div className='space-y-10 p-10'>
          <Error401 />
        </div>
      </TabsContent>
      <TabsContent value='403' className='h-full w-full'>
        <div className='space-y-10 p-10'>
          <Error403 />
        </div>
      </TabsContent>
      <TabsContent value='Mutation' className='h-full w-full'>
        <div className='space-y-10 p-10'>
          <ErrorMutation />
        </div>
      </TabsContent>
    </Tabs>
  );
};
