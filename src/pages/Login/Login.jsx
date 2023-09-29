import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../toolkitRedux/auth/euthReducer";
import s from "./Login.module.css";

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
            <>
              {/* {message && <h1 className={s.formErrorContent}>{message}</h1>} */}
              <form className={s.form} onSubmit={handleSubmit}>
                <div>
                  <h1 className={s.formLabel}>Login</h1>
                </div>
                <label className={s.formLabel}>
                  <input
                    className={s.formInput}
                    id="email"
                    placeholder=" E-mail"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className={s.formErrorContent}>{errors.email}</div>
                  ) : (
                    <div className={s.errorBox}></div>
                  )}
                </label>

                <label className={s.formLabel}>
                  <input
                    className={s.formInput}
                    id="password"
                    placeholder="Пароль"
                    type={type}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className={s.formShow} onClick={showHiden}>
                    {type === "input" ? "HIDE" : "SHOW"}
                  </div>
                  {errors.password && touched.password ? (
                    <div className={s.formErrorContent}>{errors.password}</div>
                  ) : (
                    <div className={s.errorBox}></div>
                  )}
                </label>

                <button className={s.formButton} type="submit">
                  <span>Вход</span>
                </button>

                <div className={s.btnWrapper}>
                  <p className={s.styleQuestion}>У вас нет аккаунта?</p>

                  <Link className={s.btn} to="/registration">
                    Регистрация
                  </Link>
                </div>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};
