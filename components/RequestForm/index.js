import { useState } from 'react';
import styles from '../../styles/RequestForm.module.scss';

import { TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

export default function RequestForm({
  type,
  submit,
  initialData = {},
  edit = false
}) {
  const [from, setFrom] = useState(initialData.from);
  const [to, setTo] = useState(initialData.to);
  const [date, setDate] = useState(dayjs(initialData.date));
  const [parcelType, setParcelType] = useState(initialData.parcelType);
  const [description, setDescription] = useState(initialData.description);

  const formData = type === 'order'
    ? { from, to, date, parcelType, description }
    : { from, to, date }
  ;

  return (
    <div className={styles.formContainer}>
      <TextField
        id="outlined-basic"
        label="From"
        variant="outlined"
        value={from}
        onChange={e => setFrom(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="To"
        variant="outlined"
        value={to}
        onChange={e => setTo(e.target.value)} 
      />
      <DatePicker
        label="Date of dispatch"
        value={date}
        onChange={value => setDate(value)}
      />
      {type === 'order' &&
        <>
          <TextField
            id="outlined-basic"
            label="Type of parcel"
            variant="outlined"
            value={parcelType}
            onChange={e => setParcelType(e.target.value)}

          />
          <TextField
            id="outlined-basic"
            label="Parcel description"
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </>        
      }
      <Button variant="contained" onClick={() => submit(formData)}>
        {edit ? 'Edit' : 'Create'}
      </Button>
    </div>
  )
}
