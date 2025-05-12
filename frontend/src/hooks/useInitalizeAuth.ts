import axiosClient from "../auth/axios";

export async function fetchWithAutoRefresh<T>(
  apiCallFn: () => Promise<T>,
): Promise<T> {
  try {
    return await apiCallFn();
  } catch (err: any) {
    if (err.response?.status === 401) {
      try {
        await axiosClient.post("/auth/refresh");
        return await apiCallFn();
      } catch (refreshErr) {
        throw refreshErr;
      }
    }
    throw err;
  }
}
