import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const PersonCard = () => {
  const { id } = useParams();
  const usersData = useSelector(({ data }) => data.usersData);
  const user = usersData.find((user) => id === user.id);

  return <div>{user.name}</div>;
};
