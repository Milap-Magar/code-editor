import { useEffect, useState } from "react";
import { fetchWithAutoRefresh } from "../hooks/useInitalizeAuth";
import axiosClient from "../auth/axios";
interface User {
  id: number;
  username: string;
}
const Dashboard = () => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const res = await fetchWithAutoRefresh(() =>
        axiosClient.get<User>("/me"),
      );
      setUserData(res.data.username);
      console.log(res.data.username);
    };

    getUser();
  }, []);

  return (
    <div>
      Dashboard - Protected Content
      <h1>{userData}</h1>
    </div>
  );
};

export default Dashboard;
