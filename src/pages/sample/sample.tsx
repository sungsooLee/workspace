import fetchData from '@/lib/utils/fetchData';

const resource = fetchData('https://pokeapi.co/api/v2/pokemon/ditto');

const SamplePage = () => {
  const data = resource.read();

  return <>샘플 페이지{data.id}</>;
};

export default SamplePage;
