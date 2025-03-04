import dataMock from '../mock/authUser.json';
export function useFetchAuthUser() {
  const data = dataMock;

  return {
    data,
  };
}
