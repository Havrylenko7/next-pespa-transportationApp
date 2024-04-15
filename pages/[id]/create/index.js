import styles from '../../../styles/Create.module.scss';

import { useRouter } from 'next/router';

import { Button, Typography } from '@mui/material';

export default function CreateType() {
  const router = useRouter();
  const { asPath } = router;

  const pickType = (type) => {
    router.push(asPath + type)
  };

  return (
    <div>
      <Typography sx={{ fontSize: 24 }}>
        Choose type of request
      </Typography>
      <div className={styles.buttonsContainer}>
        <Button variant="contained" onClick={() => pickType('/order')}>Order</Button>
        <Button variant="contained" onClick={() => pickType('/deliver') }>Deliver</Button>      
      </div>
    </div>
  )
}
