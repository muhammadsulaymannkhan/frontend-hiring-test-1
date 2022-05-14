import { useEffect } from "react";
import { getNewToken } from "../redux/app/appThunks";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const refreshToken = async () => {
    await dispatch(getNewToken());
  };
  useEffect(() => {
    refreshToken();
    if (user) {
      router.push("/records");
    } else {
      router.push("/login");
    }
  }, [user]);

  return <></>;
}
