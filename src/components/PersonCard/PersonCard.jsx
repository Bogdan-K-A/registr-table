import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, Avatar } from '@mui/material';
import s from './PersonCard.module.css';

export const PersonCard = () => {
  const { id } = useParams();
  const usersData = useSelector(({ data }) => data.usersData);
  const user = usersData.find((user) => id === user.id);

  return (
    <div className={s.contentWrapper}>
      <Card className={s.card} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <div className={s.avatarWrapper}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>

          <CardContent>
            <div className={s.avatarWrapper}>
              <Typography component="div"># {user.id}</Typography>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
            </div>
            <Typography>Дата регистрации: {user.dateRegistred}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
