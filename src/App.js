import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./routers";
import DefaultComponents from "./components/DefaultComponet/DefaultComponents";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "./services/UserServices";
import { updateUser } from "./redux/slides/userSlide";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    const { decoded, storegeData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storegeData);
    }
    setPending(false);
  }, []);

  const handleDecoded = () => {
    let storegeData = localStorage.getItem("access_token");
    let decoded = {};
    if (storegeData) {
      // decoded = jwtDecode(storegeData);
      // console.log("decodedApp", decoded);
      try {
        decoded = jwtDecode(storegeData);
        console.log("decodedApp", decoded);
      } catch (error) {
        console.error("Failed to decode JWT token:", error.message);
      }
    }
    return { decoded, storegeData };
  };

  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        console.log("refreshToken");
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res", res);
  };

  return (
    <div>
      <Loading isPending={pending}>
        <Router>
          <Routes>
            {router.map((route) => {
              const Layout = route.isShowHeader ? DefaultComponents : Fragment;
              const Page = route.page;
              const checkAdmin = !route.isPrivate || user.isAdmin;
              return (
                <Route
                  key={route.path}
                  path={checkAdmin ? route.path : ""}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
