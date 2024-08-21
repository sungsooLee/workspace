import axios from 'axios';

export type KitProps = {
  kitId: number;
};

const getKit = async (props: KitProps) => {
  //  const response = await axios.get(`${import.meta.env.VITE_CMS_MOUDLE_URL}/admin/api/v1/kits/`, params : props);
};

export const KitContainer = (props: KitProps) => {};
