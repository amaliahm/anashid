import {useState, useEffect} from 'react';

//MUI
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { SnackbarContent } from '@mui/material';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function Notification({name, color}) {
  const [transition, setTransition] = useState(undefined);

  useEffect(() => {
      setTransition(() => TransitionRight);
  });


  return (
    <Box >
      <Snackbar
        open={true}
        TransitionComponent={transition}
        key={transition ? transition.name : ''}
      > 
            <SnackbarContent 
              style={{
                backgroundColor:`${color}`,
              }}
              message={
                <span style={{
                  color: 'white',
                  textTransform: 'capitalize',
                }} >
                    {name}
                </span>
            }
            />
      </Snackbar>
    </Box>
  );
}