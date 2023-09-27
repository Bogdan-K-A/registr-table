import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../toolkitRedux/auth/euthReducer";

export const Registration = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        }}
        onSubmit={({ name, email, password }) => {
          const user = { name, email, password };

          navigate("/", { replace: true });
          dispatch(register(user));
        }}
        //валідація форми
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .min(10)
            .max(63)
            .required("Обязательное поле"),
          password: Yup.string()
            .required("Обязательное поле")
            .min(6, "Пароль слишком короткий (минимум 6 символов)")
            .max(16, "Пароль слишком длинный (максимум 16 символов)"),
          confirmPassword: Yup.string()
            .required("Обязательное поле")
            .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
          name: Yup.string()
            .min(1, "Имя не должно быть пустым")
            .max(12, "Имя не может быть больше 12 символов")
            .required("Обязательное поле"),
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
            <div className="form__filter">
              {/* {message && <h1 style={{ color: "red" }}>{message}</h1>} */}
              <form className="form" onSubmit={handleSubmit}>
                <label className="form__label">
                  {errors.name && touched.name ? (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="form__input"
                    type="name"
                    name="name"
                    placeholder="Ваше имя"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </label>

                <label className="form__label">
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="form__input"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>

                <label className="form__label">
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="form__input"
                    type={type}
                    name="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <span className="form__show" onClick={showHiden}>
                    {type === "input" ? "HIDE" : "SHOW"}
                  </span>
                </label>

                <label className="form__label">
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                  ) : (
                    <div style={{ height: "19px" }}></div>
                  )}

                  <input
                    className="form__input"
                    type={type}
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </label>

                <button
                  type="submit"
                  className="form__button form__button--active"
                >
                  Регистрация
                </button>

                <div>
                  <p>У вас есть аккаунт?</p>
                  <button>
                    <Link to="/" className="form__button">
                      Вход
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
