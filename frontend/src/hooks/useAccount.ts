import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userEditService } from "../services/userEditService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

const useAccount = () => {
  const [data, setData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const editUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsPending(true);
      setError("");

      const userData = await userEditService({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role: data.role ?? "customer",
      });

      dispatch(setUser(userData));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (user) {
      setData({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [user]);

  return {
    editUser,
    error,
    isPending,
    data,
    setData,
  };
};

export default useAccount;
