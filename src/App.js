import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./routers";
import DefaultComponents from "./components/DefaultComponet/DefaultComponents";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "./services/UserServices";
import { updateUser } from "./redux/slides/userSlide";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const { decoded, storegeData } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storegeData);
    }
  }, []);

  const handleDecoded = () => {
    let storegeData = localStorage.getItem("access_token");
    let decoded = {};
    if (storegeData) {
      decoded = jwtDecode(storegeData);
      console.log("decodedApp", decoded);
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
      <Router>
        <Routes>
          {router.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponents : Fragment;
            const Page = route.page;
            return (
              <Route
                key={route.path}
                path={route.path}
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
    </div>
  );
}

export default App;
