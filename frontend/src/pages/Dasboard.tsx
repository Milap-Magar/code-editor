import { useEffect, useState } from "react";
import { fetchWithAutoRefresh } from "../hooks/useInitalizeAuth";
import axiosClient from "../auth/axios";

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchWithAutoRefresh(() =>
          axiosClient.get<{ success: boolean; user: User }>("/auth/me"),
        );
        setUserData(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <h1>Dashboard - Protected Content</h1>
      {userData ? (
        <h2>Welcome, {userData.username}</h2>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
