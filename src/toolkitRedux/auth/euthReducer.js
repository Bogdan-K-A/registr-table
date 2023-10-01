import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { uid } from 'uid';

const createAccount = (data) => {
  return {
    id: uid(),
    name: 'Jeck',
    email: 'test1@ukr.net',
    password: 'qwerty1',
    phone: '3423542431',
    balance: '30.00',
    dateRegistred: '11/09/2023',
    ...data,
  };
};

const ACCOUNT = createAccount({
  id: uid(),
});

const ACCOUNTS_MOCKS = [
  ACCOUNT,
  createAccount({
    name: 'Bob',
    email: 'test2@ukr.net',
    password: 'qwerty2',
    phone: '999999999',
    balance: '100.00',
    dateRegistred: '15/09/2023',
  }),
];

const authSlice = createSlice({
  name: 'data',
  initialState: {
    usersData: ACCOUNTS_MOCKS,
    message: '',
    isLoggedIn: false,
  },
  reducers: {
    register: (state, { payload }) => {
      const currentEmail = state.usersData.some(({ email }) => payload.email === email);

      if (currentEmail.email === payload.email) {
        console.log('Такой пользователь уже есть');
        state.message = 'Такой пользователь уже есть';
        return;
      } else {
        state.usersData.push(createAccount(payload));
        console.log('Вы зарегистрировались');
        state.message = 'Вы зарегистрировались';
      }
    },

    signin: (state, { payload }) => {
      const currentEmail = state.usersData.some((account) => {
        return payload.email === account.email;
      });
      const currentPassword = state.usersData.some((account) => {
        return payload.password === account.password;
      });

      // console.log('signin currentEmail', currentEmail);
      // console.log('signin currentPassword', currentPassword);

      if (!currentEmail || !currentPassword) {
        state.message = 'Что-то пошло не так';
        return;
      } else {
        state.isLoggedIn = true;
      }
    },

    signout: (state) => {
      state.isLoggedIn = false;
    },

    filter: (state) => {},
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

export const { register, signin, signout, filter } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
