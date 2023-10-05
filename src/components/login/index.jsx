import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { LOCATIONS } from "constants/index";
import { actionLogin, actionResetLogin } from "store/login/action";

import "./login.css";
import { useDispatch } from "react-redux";
import { axiosAdmin } from "helper/axios";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [isHaveReponsive, setIsHaveReponsive] = useState(true);

  // const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  const loginState = useSelector((state) => state.LoginReducer.payload);
  const isLoading = useSelector((state) => state.LoginReducer.isLoading);

  useEffect(() => {
    if (loginState.token && loginState.refreshToken) {
      localStorage.setItem("TOKEN", loginState.token);

      localStorage.setItem("REFRESH_TOKEN", loginState.refreshToken);
    } else if (loginState === "Unauthorized") {
      alert("Email hoặc mật khẩu không đúng!");
      dispatch(actionResetLogin());
    }
  }, [dispatch, loginState]);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      axiosAdmin.defaults.headers.Authorization = `Bearer ${token}`;
      navigate(LOCATIONS.PRODUCTS);
    }
  }, [navigate, loginState]);

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .test("email type", "Email không đúng định dạng", (value) => {
          const emailRegex = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

          return emailRegex.test(value);
        })
        .required("Vui lòng nhập Email!"),
      password: Yup.string()
        .min(6, "Password ít nhất 6 ký tự")
        .max(16, "Password nhiều nhất 16 ký tự")
        .required("Vui lòng nhập Password!"),
    }),

    onSubmit: (values) => {
      //sự kiện khi người dùng ấn Login
      const { email, password } = values; //lấy 2 biến email và password từ values gán vào email và password tương ứng

      onSubmitAsync({ email, password }); //gọi hàm onSubmitAsync truyền vào param { email, password }
      // setIsHaveReponsive(false); //set biến isHaveReponsive thành false để gọi màn hình loading
    },
  });

  const onClickButton = useCallback(
    (e) => {
      e.preventDefault(); //ngăn chặn hành vi mặc định của submit form

      validation.handleSubmit(); //gọi hàm handleSubmit trong Formik
    },
    [validation]
  );

  const isErrorInfo = (fieldName) => {
    //check có lỗi nhập liệu hay không theo fieldName truyền vào
    if (validation.errors[fieldName] && validation.touched[fieldName]) {
      return true;
    }
    return false;
  };

  const onSubmitAsync = (data) => {
    dispatch(actionLogin(data));
  };

  return (
    <>
      {isLoading && (
        <div className="loadingContainer">
          <div className="loadingIcon"></div>
        </div>
      )}

      <div className="container cover_login_title">ĐĂNG NHẬP HỆ THỐNG</div>

      <div className="row form_dang_ky">
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"></div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <div className="cover_form">
            <form>
              <div className="row">
                <div className="suggest_user">
                  User: <i>nam@gmail.com</i>
                </div>
                <div className="mb-3 input_div">
                  <input
                    name="email"
                    type="text"
                    className={`form-control ${
                      isErrorInfo("email") && "is-invalid"
                    }`}
                    id="email"
                    placeholder="Email"
                    required
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />

                  {isErrorInfo("email") && (
                    <div className="input_error">{validation.errors.email}</div>
                  )}
                </div>

                <div className="suggest_password">
                  Password: <i>123456</i>
                </div>
                <div className="mb-3 input_div">
                  <input
                    name="password"
                    type="password"
                    className={`form-control ${
                      isErrorInfo("password") && "is-invalid"
                    }`}
                    id="password"
                    placeholder="Password"
                    required
                    value={validation.values.password}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />

                  {isErrorInfo("password") && (
                    <div className="input_error">
                      {validation.errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-danger btn_dangky_form"
                  onClick={onClickButton}
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"></div>
      </div>
    </>
  );
}

export default memo(Login);
