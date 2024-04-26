import { useState } from 'react';
import styles from '../styles/Requests.module.scss';

import { useSelector } from 'react-redux';

import Link from 'next/link';

import { Button, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

import Card from '@/components/Card';
import findUser from '@/helpers/findUser';
import dayjs from 'dayjs';

export default function Requests() {
  const [sort, setSort] = useState(true);

  const { user, users, requests } = useSelector((state) => ({
    user: state.auth.user,
    users: state.auth.users,
    requests: state.requests.requests
  }))

  const sortedRequests = [...requests].sort((a, b) => {
    const dateA = sort ? dayjs(a.date) : dayjs(b.date);
    const dateB = sort ? dayjs(b.date) : dayjs(a.date);
    if (dateA.isBefore(dateB)) return -1;
    if (dateA.isAfter(dateB)) return 1;
    return 0
  });

  return (
    <div className={styles.requestsContiner}>
      <div className={styles.headerContiner}>
        <Typography  sx={{ fontSize: 24 }}>
          All Requests
        </Typography>
        <Link href={`/${user}/requests`}>
          <Button variant="contained">Your Requests</Button>
        </Link>
      </div>
      {requests[0] ?
        <>
          <div className={styles.sortContainer} onClick={() => setSort(!sort)}>
            <SortIcon color="disabled" />
            <Typography  sx={{ fontSize: 16 }} color="text.secondary">
              Sort by date
            </Typography>
          </div>
          <div className={styles.listContainer}>
            {sortedRequests.map(request => 
              <Card
                data={request}
                key={request.token}
                user={findUser(request.createdBy, users)?.userName}
              />
            )}
          </div>
        </>
      :
        <Typography
          sx={{ fontSize: 16 }}
          color="text.secondary"
          align="center"
        >
          No requests!
        </Typography>
      }
    </div>
  )
}
