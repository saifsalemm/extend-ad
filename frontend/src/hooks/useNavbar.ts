import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../App";
import { getCurrentUserDataService } from "../services/getCurrentUserDataService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setShowNav } from "../store/slices/navbarSlice";
import { setUser } from "../store/slices/userSlice";

const useNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showNavMenu } = useAppSelector((state: any) => state.navbar);
  const user = useAppSelector((state: any) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate(RoutesEnum.CATALOGUE);
    }
  }, [user]);

  useEffect(() => {
    getCurrentUserDataService()
      .then((user) => {
        dispatch(setUser(user));
        localStorage.setItem("token", user.token);
      })
      .catch(() => {
        dispatch(setUser(null));
      });
  }, [dispatch]);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const setShowNavMenu = () => {
    dispatch(setShowNav());
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };

  return {
    isLoggedIn,
    isAdmin,
    showNavMenu,
    setShowNavMenu,
    logOut,
  };
};

export default useNavbar;
