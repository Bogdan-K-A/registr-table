import React from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../toolkitRedux/auth/euthReducer";
import { TbLogout2 } from "react-icons/tb";
import s from "./Header.module.css";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(({ data }) => data.isLoggedIn);
  const { id } = useParams();
  const currentPath = location.pathname === `/table/personCard/${id}`;

  return (
    <header className={s.header}>
      <div>
        {!isLoggedIn && (
          <>
            <NavLink className={s.linkStyle} to="/">
              Login
            </NavLink>
            <NavLink className={s.linkStyle} to="/registration">
              Registration
            </NavLink>
          </>
        )}

        {currentPath && (
          <Link className={s.linkTable} to="/table">
            Вернуться к таблице
          </Link>
        )}
      </div>

      {isLoggedIn && (
        <TbLogout2
          className={s.btn}
          size={30}
          title="Logout"
          onClick={() => {
            navigate("/", { replace: true });
            dispatch(signout());
          }}
        />
      )}
    </header>
  );
};
