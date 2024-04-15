import { useDispatch, useSelector } from 'react-redux';
import { createRequest } from '@/store/reducers/requestsSlice';

import { useRouter } from 'next/router';

import RequestForm from '@/components/RequestForm';

export default function Create() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)

  const { type } = router.query;

  const submit = (data) => {
    dispatch(createRequest({ ...data, type, createdBy: user }))
    router.push('/requests')
  }

  return (
    <RequestForm type={type} submit={submit}/>
  )
}
