import axios from 'axios';

export const getContent = async (contentId: number) => {
  const response = await axios.get(
    `/cms-module/admin/api/v1/video/${contentId}`
  );
  return response.data;
};
