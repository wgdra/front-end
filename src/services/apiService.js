import instance from "../utils/axiosCustomize";

const getDataRoom = () => {
  return instance.get(`/manage-room?${Date.now()}`);
};

export { getDataRoom };
