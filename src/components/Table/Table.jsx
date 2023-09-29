import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Table = () => {
  const users = useSelector(({ data }) => data.usersData);

  return (
    <div style={{ marginTop: "30px" }}>
      <h1>Таблица</h1>

      {users.map(({ id, name }) => {
        return (
          <li key={id} style={{ display: "flex", marginBottom: "30px" }}>
            <p style={{ marginRight: "30px" }}>{id}</p>
            <Link to={`personCard/${id}`}>{name}</Link>
          </li>
        );
      })}
    </div>
  );
};
