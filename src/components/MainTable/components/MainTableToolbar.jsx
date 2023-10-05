import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearFilter, filter } from '../../../toolkitRedux/auth/euthReducer';
import { BiSearchAlt } from 'react-icons/bi';
import { Formik } from 'formik';

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
              <form onSubmit={handleSubmit}>
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

                <button type="submit">
                  <BiSearchAlt size={35} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(clearFilter());
                    setSearchText('');
                  }}
                >
                  Очистить фильтр
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </Toolbar>
  );
};
