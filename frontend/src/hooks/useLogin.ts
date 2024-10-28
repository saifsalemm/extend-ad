import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../App";
import { userLoginService } from "../services/loginService";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

const useLogin = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(true);
      setError("");
      const userData = await userLoginService({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      });
      dispatch(setUser(userData));
      localStorage.setItem("token", userData.token);
      navigate(RoutesEnum.CATALOGUE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { loginUser, error, isPending, emailRef, passwordRef };
};

export default useLogin;
