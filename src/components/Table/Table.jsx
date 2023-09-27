import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const Table = () => {
  const users = useSelector(({ data }) => data.usersData);
  const location = useLocation();
  console.log("location: ", location);

  // personCard/
  return (
    <div style={{ marginTop: "30px" }}>
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
