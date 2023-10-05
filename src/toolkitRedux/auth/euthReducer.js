import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { uid } from 'uid';
import { onError, onSuccess, onWarning } from '../../components/Error/ErrorMessages';

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
    originData: ACCOUNTS_MOCKS,

    isLoggedIn: false,
  },
  reducers: {
    register: (state, { payload }) => {
      const currentEmail = state.usersData.find(({ email }) => payload.email === email);

      if (currentEmail) {
        onWarning('Такой пользователь уже есть');
        return;
      } else {
        state.usersData.push(createAccount(payload));
        state.originData.push(createAccount(payload));

        onSuccess('Вы зарегистрировались');
      }
    },

    signin: (state, { payload }) => {
      const currentEmail = state.usersData.some((account) => {
        return payload.email === account.email;
      });
      const currentPassword = state.usersData.some((account) => {
        return payload.password === account.password;
      });

      if (!currentEmail || !currentPassword) {
        onError('Что-то пошло не так');

        return;
      } else {
        state.isLoggedIn = true;
      }
    },

    signout: (state) => {
      state.isLoggedIn = false;
    },

    filter: (state, { payload }) => {
      let currentValue = Object.values(payload)[0].toLowerCase();

      state.usersData = state.originData.filter((user) => {
        const normalizedText = user.name.toLowerCase();

        return (
          normalizedText.includes(currentValue) ||
          user.email.includes(currentValue) ||
          user.phone.includes(currentValue)
        );
      });
    },

    clearFilter: (state) => {
      state.usersData = state.originData;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

export const { register, signin, signout, filter, clearFilter } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
