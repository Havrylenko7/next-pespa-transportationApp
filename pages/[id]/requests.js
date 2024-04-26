import { useState } from 'react';
import styles from '../../styles/UserRequests.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { editRequest, deleteRequest } from '@/store/reducers/requestsSlice';

import { useRouter } from 'next/router';
import Link from 'next/link';

import RequestForm from '@/components/RequestForm';
import Card from '@/components/Card';

import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import findUser from '@/helpers/findUser';

export default function UserRequests() {
  const [edit, setEdit] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const { user, users, requests } = useSelector((state) => ({
    user: state.auth.user,
    users: state.auth.users,
    requests: state.requests.requests
  }))

  const submit = (formData) => {
    const data = {
      ...formData,
      createdBy: edit.createdBy,
      token: edit.token,
      type: edit.type
    }

    dispatch(editRequest(data));
    router.push('/requests')
  }

  return (
    <>
      {edit ?
        <RequestForm
          type={edit.type}
          submit={submit}
          initialData={edit}
          edit={true}
        />
      :
        <div className={styles.container}>
          <div className={styles.headerContiner}>
            <Typography sx={{ fontSize: 24 }}>
              Your Requests
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Matches
            </Typography>
            <Link href={`/${user}/create`}>
              <Button variant="contained">Create</Button>
            </Link>
          </div>

          <div className={styles.requestsContiner}>
            {requests[0] && requests.find(request => request.createdBy === user) ? 
              requests.filter(request => request.createdBy === user)
                .map(request => 
                  <div className={styles.requests}>
                    <div key={request.token}>
                      <Card
                        data={request}
                        key={request.token}
                        remove={() => dispatch(deleteRequest(request.token))}
                        edit={() => setEdit(request)}
                      />
                    </div>

                    <div className={styles.oppRequestsContainer}>
                      {requests.filter(oppRequest => 
                        oppRequest.type !== request.type && 
                        oppRequest.to === request.to &&
                        oppRequest.from === request.from &&
                        oppRequest.createdBy !== request.createdBy &&
                        (request.type === 'order' ? 
                          dayjs(request.date).isBefore(dayjs(oppRequest.date))
                        : dayjs(request.date).isAfter(dayjs(oppRequest.date))
                        )
                      ).map((oppRequest, id) =>
                        <Card
                          data={oppRequest}
                          key={id} 
                          user={findUser(request.createdBy, users)?.userName}
                          match
                        />
                      )}
                    </div>
                  </div>
                )
            :
              <Typography
                sx={{ fontSize: 16 }}
                color="text.secondary"
                align="center">
                No requests for now!
              </Typography>
            }
          </div>
        </div>
      }
    </>
  )
}
