import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../toolkitRedux/auth/euthReducer";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header>
      <NavLink to="/">Login</NavLink>
      <NavLink to="/registration">Registration</NavLink>
      {/* выдать по условию если зарегистрирован значит показываем */}
      <NavLink to="/table">Table</NavLink>
      <button
        onClick={() => {
          navigate("/", { replace: true });
          dispatch(signout());
        }}
      >
        Logout
      </button>
    </header>
  );
};
