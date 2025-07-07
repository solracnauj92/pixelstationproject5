import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    if (document.cookie.includes("my-app-auth")) {
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.log("User fetch failed:", err);
      }
    } else {
      console.log("No access token found. Skipping user fetch.");
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (
          shouldRefreshToken() &&
          document.cookie.includes("my-refresh-token")
        ) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prev) => {
              if (prev) history.push("/signin");
              return null;
            });
            removeTokenTimestamp();
          }
        } else {
          console.log("No refresh token found. Skipping token refresh.");
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (
          err.response?.status === 401 &&
          document.cookie.includes("my-refresh-token")
        ) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            return axios(err.config);
          } catch (refreshErr) {
            setCurrentUser((prev) => {
              if (prev) history.push("/signin");
              return null;
            });
            removeTokenTimestamp();
          }
        } else {
          console.log("Unauthorized and no refresh token present.");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
