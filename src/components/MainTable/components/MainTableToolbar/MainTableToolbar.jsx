import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearFilter, filter } from '../../../../redux/auth/authReducer';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import { Formik } from 'formik';
import s from './MainTableToolbar.module.css';

export const MainTableToolbar = ({ numSelected }) => {
  const [option, setOption] = useState('');
  const [labelSearch, setLabelSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Person
        </Typography>
      )}

      <Formik
        initialValues={{}}
        onSubmit={(value) => {
          dispatch(filter(value));
          setSearchText('');
        }}
      >
        {(props) => {
          const { handleChange, handleBlur, handleSubmit } = props;
          const handleOptionsChange = (e) => {
            const valueFromSelect = e.target.value;
            setOption(valueFromSelect);

            if (valueFromSelect === 'name') {
              setLabelSearch('Name');
            }

            if (valueFromSelect === 'email') {
              setLabelSearch('Email');
            }

            if (valueFromSelect === 'phone') {
              setLabelSearch('Phone');
            }
          };
          return (
            <>
              <form className={s.formToolbar} onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Опции</InputLabel>
                  <Select label="Опции" onChange={handleOptionsChange}>
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'name'}>Name</MenuItem>
                    <MenuItem value={'email'}>Email</MenuItem>
                    <MenuItem value={'phone'}>Phone</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  label={option ? labelSearch : 'Search'}
                  type="text"
                  name={option}
                  onChange={(e) => {
                    handleChange(e);
                    setSearchText(e.target.value);
                  }}
                  onBlur={handleBlur}
                  value={searchText}
                />

                <button className={s.btn} type="submit">
                  <BiSearchAlt title="Фильтр" size={35} />
                </button>

                <AiOutlineClear
                  title="Очистить фильтр"
                  size={35}
                  onClick={() => {
                    dispatch(clearFilter());
                    setSearchText('');
                  }}
                />
              </form>
            </>
          );
        }}
      </Formik>
    </Toolbar>
  );
};
