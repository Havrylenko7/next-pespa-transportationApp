import { useState } from 'react';
import styles from '../../styles/Card.module.scss';

import {
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  Button
} from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

import dayjs from 'dayjs';

export default function CustomCard({
  data,
  user = null,
  match = false,
  remove = false,
  edit = false
}){
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Card className={styles.cardContainer}>
      <CardContent style={{ background: match ? '#ffda79' : 'inherit' }}>
        <div className={styles.headerContainer}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.type}
          </Typography>
          {remove && edit ?
            <div>
              <Delete onClick={() => setOpen(true)} />
              <Create onClick={edit} />
            </div>
            :
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {user}
            </Typography>
          }
        </div>
        
        <Typography variant="h5" component="div">
          {data.from}  
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.to} 
        </Typography>
        <Typography variant="body2">
          {dayjs(data.date).format('DD.MM.YYYY')}
        </Typography>
        {data.type === 'order' && 
          <div className={styles.infoContainer}>
            <Typography variant="body2" color="text.secondary">
              {data.parcelType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description} 
            </Typography>
          </div>
        }
      </CardContent>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure about this action?
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button onClick={remove} color="error" variant="contained">Delete</Button>
            <Button onClick={handleClose} color="primary" variant="contained">Close</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}
 