import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../App";
import { userRegisterService } from "../services/registerService";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

const useRegister = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(true);
      setError("");
      const userData = await userRegisterService({
        first_name: firstNameRef.current!.value,
        last_name: lastNameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        role: roleRef.current!.value,
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

  return {
    registerUser,
    error,
    isPending,
    firstNameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    roleRef,
  };
};

export default useRegister;
