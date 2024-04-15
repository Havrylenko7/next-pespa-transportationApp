import styles from '../../styles/Card.module.scss';

import { Card, CardContent, Typography } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

import dayjs from 'dayjs';

export default function CustomCard({
  data,
  user = null,
  match = false,
  remove = false,
  edit = false
}){

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent style={{ background: match ? '#ffda79' : 'inherit' }}>
        <div className={styles.headerContainer}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.type}
          </Typography>
          {remove && edit ?
            <div>
              <Delete onClick={remove} />
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
    </Card>
  )
}
 