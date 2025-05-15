
import { useState, useEffect } from "react";
import axios from "axios"; // Or use fetch API directly

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        // console.log("🚀 ~ fetchUser ~ res:", res);
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err: any) {
        // console.error("Error fetching user:", err);
        setUser(null);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};

export default useFetchUser;
