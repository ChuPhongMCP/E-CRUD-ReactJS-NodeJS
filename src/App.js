import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';

import './App.css';
import { LOCATIONS } from 'constants/index';
import { routers, unAuthRouter } from 'router/router';
// import { actionGetMyProfile } from 'store/profile/action';
import { axiosAdmin, axiosAdminUpFile } from 'helper/axios'

function App() {
  // const dispatch = useDispatch(); //khai báo sử dụng dispatch để đẩy dữ liệu lên store
  const token = localStorage.getItem('TOKEN');

  const navigate = useNavigate(); //khai báo sử dụng hàm chuyển trang

  useEffect(() => {
    if (token) { //nếu tồn tại token trên localStorage
      axiosAdmin.defaults.headers.Authorization = `Bearer ${token}`; //gán trạng thái đã xác nhận login lên header theo quy phạm từ BE
      axiosAdminUpFile.defaults.headers.Authorization = `Bearer ${token}`; //gán trạng thái đã xác nhận login lên header theo quy phạm từ BE
    } else { //nếu không tồn tại token trên localStorage
      navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
    }
  }, [navigate, token]);

  const renderRoutes = useCallback((routers, unAuthRouter) => {
    //hàm đệ quy map ra các router theo trạng thái đã và chưa đăng nhập tương ứng
    if (!token) { //router khi chưa đăng nhập
      return unAuthRouter.map((route, index) => {
        if (route.children && route.children.length > 0) {
          return (
            <Route path={route.path} element={route.element} key={index}>

              {renderRoutes(route.children)}

            </Route>
          );
        }

        if (route.isRoot) {
          return <Route index element={route.element} key={index} />
        }

        return <Route path={route.path} element={route.element} key={index} />;
      });
    }

    return routers.map((route, index) => { //router khi đã đăng nhập
      if (route.children && route.children.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>

            {renderRoutes(route.children)}

          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />
      }

      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, [token]);

  return (
    <div className='App'>
      <Routes>
        {renderRoutes(routers, unAuthRouter)}
      </Routes>
    </div>
  );
}

export default App;
