import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../toolkitRedux/auth/euthReducer";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  // const message = useSelector(({ data }) => data.message);

  const showHiden = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let currentType = type === "password" ? "input" : "password";
    setType(currentType);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          navigate("/table", { replace: true });
          dispatch(signin(values));
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Обязательное поле"),
          password: Yup.string().required("Обязательное поле"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <div className="form_bg_filter">
              {/* {message && <h1 style={{ color: "red" }}>{message}</h1>} */}
              <form onSubmit={handleSubmit} className="login_form">
                <div>
                  <h1>Login</h1>
                </div>
                <label className="login_form__label">
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="login_form__input"
                    id="email"
                    placeholder=" E-mail"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>

                <label className="login_form__label">
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="login_form__input"
                    id="password"
                    placeholder="Пароль"
                    type={type}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <span className="form__show" onClick={showHiden}>
                    {type === "input" ? "HIDE" : "SHOW"}
                  </span>
                </label>

                <button
                  className="login_form__btn login_form__btn--current"
                  type="submit"
                >
                  <span>Вход</span>
                </button>

                <div>
                  <p>У вас нет аккаунта?</p>
                  <button>
                    <Link
                      to="/registration"
                      className="login_form__btn login_form__btn_color"
                    >
                      <span>Регистрация</span>
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
