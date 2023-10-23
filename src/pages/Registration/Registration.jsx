import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authReducer';
import s from './Registration.module.css';
import moment from 'moment/moment';

export const Registration = () => {
  const [type, setType] = useState('password');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showHiden = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let currentType = type === 'password' ? 'input' : 'password';
    setType(currentType);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        onSubmit={({ name, email, password }) => {
          const dateRegistred = moment().format('DD/MM/YYYY');
          const user = { name, email, password, dateRegistred };

          dispatch(register(user));
          navigate('/', { replace: true });
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().min(10).max(63).required('Обязательное поле'),
          password: Yup.string()
            .required('Обязательное поле')
            .min(6, 'Пароль слишком короткий (минимум 6 символов)')
            .max(16, 'Пароль слишком длинный (максимум 16 символов)'),
          confirmPassword: Yup.string()
            .required('Обязательное поле')
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
          name: Yup.string()
            .min(1, 'Имя не должно быть пустым')
            .max(12, 'Имя не может быть больше 12 символов')
            .required('Обязательное поле'),
        })}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
          return (
            <>
              <form className={s.form} onSubmit={handleSubmit}>
                <div>
                  <h1 className={s.formLabel}>Registration</h1>
                </div>
                <label className={s.formLabel}>
                  <input
                    className={s.formInput}
                    type="name"
                    name="name"
                    placeholder="Ваше имя"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <div className={s.formErrorContent}>{errors.name}</div>
                  ) : (
                    <div className={s.errorBox}></div>
                  )}
                </label>

                <label className={s.formLabel}>
                  <input
                    className={s.formInput}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
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
                    type={type}
                    name="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <div className={s.formShowWrapper}>
                    {errors.password && touched.password ? (
                      <p className={s.formErrorContent}>{errors.password}</p>
                    ) : (
                      <div className={s.errorBox}></div>
                    )}
                    <p className={s.formShow} onClick={showHiden}>
                      {type === 'input' ? 'HIDE' : 'SHOW'}
                    </p>
                  </div>
                </label>

                <label className={s.formLabel}>
                  <input
                    className={s.formInput}
                    type={type}
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className={s.formErrorContent}>{errors.confirmPassword}</div>
                  ) : (
                    <div className={s.errorBox}></div>
                  )}
                </label>

                <button className={s.formButton} type="submit">
                  Регистрация
                </button>

                <div className={s.btnWrapper}>
                  <p className={s.styleQuestion}>У вас есть аккаунт?</p>

                  <Link className={s.btn} to="/">
                    Вход
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
