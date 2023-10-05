import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LOCATIONS } from "constants/index";
import { routers } from "router/router";
import "./header.css";
import Loading from "components/loading";
import {
  actionGetMyProfile,
  actionResetGetMyProfile,
} from "store/profiles/profile/action";
import { axiosAdmin } from "helper/axios";
import {
  actionGetProfileImage,
  actionResetGetProfileImage,
} from "store/profiles/getProfileImage/action";
import { actionResetLogin } from "store/login/action";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkToken = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (checkToken) {
      //nếu tồn tại token trên localStorage
      axiosAdmin.defaults.headers.Authorization = `Bearer ${checkToken}`; //gán trạng thái đã xác nhận login lên header theo quy phạm từ BE
    } else {
      //nếu không tồn tại token trên localStorage
      navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
    }
  }, [navigate, checkToken]);

  const [token, setToken] = useState(localStorage.getItem("TOKEN"));

  const profile = useSelector((state) => state.profileReducer.profile); // truyền profile từ state.profileReducer
  const isLoading = useSelector((state) => state.profileReducer.isLoading);
  const [profileImage, setProfileImage] = useState({});
  const [imageURL, setImageURL] = useState({});

  const resProfileImage = useSelector(
    (state) => state.getProfileImageReducer.profile
  );

  useEffect(() => {
    if (
      localStorage.getItem("TOKEN") !== null &&
      localStorage.getItem("REFRESH_TOKEN") !== null
    ) {
      //nếu tồn tại token trên localStorage
      dispatch(actionGetMyProfile()); //đẩy action actionGetMyProfile lên store
    } else {
      navigate(LOCATIONS.LOGIN);
    }
  }, [dispatch, navigate]);

  const getProfileImage = useCallback(() => {
    if (profile.payload && profile.payload._id) {
      dispatch(actionGetProfileImage(profile.payload._id));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    getProfileImage();
  }, [getProfileImage, profile]);

  useEffect(() => {
    setProfileImage(resProfileImage);
  }, [resProfileImage]);

  useEffect(() => {
    if (profileImage && profileImage.payload) {
      const imageUrl = profileImage.payload.location.replace(/\\/g, "/");

      setImageURL(imageUrl);
    }
  }, [profileImage]);

  const renderNav = useCallback(() => {
    const render = routers.map((item) => {
      if (item.children?.length > 0) {
        return item.children.map((child, index) => {
          if (child.name) {
            return (
              <li key={index} className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle nav_link"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {child.name}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {child.children?.length > 0 &&
                    child.children.map((childItem, index) => {
                      if (childItem.name) {
                        return (
                          <li key={index}>
                            <Link className="dropdown-item" to={childItem.path}>
                              {childItem.name}
                            </Link>
                          </li>
                        );
                      }

                      return null;
                    })}
                </ul>
              </li>
            );
          }

          return null; // Ignore children without a name
        });
      }

      return null; // Ignore items without children
    });

    return render;
  }, []);

  const logoutFunction = useCallback(() => {
    //sự kiện logout
    localStorage.removeItem("TOKEN"); //xóa token từ localStorage
    localStorage.removeItem("REFRESH_TOKEN"); //xóa refreshtoken từ localStorage
    setToken(localStorage.getItem("TOKEN")); //setToken = null
    
    dispatch(actionResetGetProfileImage());
    dispatch(actionResetGetMyProfile());
    dispatch(actionResetLogin());
    
    navigate(LOCATIONS.LOGIN); //chuyển hướng sang trang login

  }, [dispatch, navigate]);

  const isLogin = useCallback(() => {
    //xác định thành phần sẽ render theo biến trạng thái token tương ứng
    if (token) {
      if (isLoading) {
        return (
          <div className="container emp-profile notification profile_thumbail">
            <Loading />
          </div>
        );
      }
      return (
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              width={50}
              height={50}
              style={{ borderRadius: "100%" }}
              src={imageURL}
              alt=""
            />{" "}
            <span className="profile_name">{profile.payload?.fullName}</span>
          </Link>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to={LOCATIONS.PROFILE}>
                My Profile
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" onClick={logoutFunction}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    }
    return (
      <Link className="nav-link active" aria-current="page" to="form">
        Login
      </Link>
    );
  }, [imageURL, isLoading, logoutFunction, profile.payload?.fullName, token]);

  return (
    <div className="nav_">
      <nav className="navbar navbar-expand-sm bg-night navbar-night">
        <div className="container-fluid">
          <Link
            className="navbar-brand mt-1 mb-1 nav_logo"
            to={LOCATIONS.PRODUCTS}
          >
            E-SHOP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="nav_menu">
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">{renderNav()}</ul>
            </div>
          </div>

          <ul className="navbar-nav ms-auto ">{isLogin()}</ul>
        </div>
      </nav>
    </div>
  );
}

export default memo(Header);
