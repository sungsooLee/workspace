import axios from 'axios';

export const errorGetData = async (param?: string) => {
  const response = await axios.get(`/error/${param}`);
  return response.data;
};
