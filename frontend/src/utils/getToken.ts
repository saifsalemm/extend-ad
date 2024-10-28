import { store } from "../store/store";

export const getToken = () => {
  const token = store.getState().user.user?.token ?? null;
  return token ? `Bearer ${token}` : '';
};
