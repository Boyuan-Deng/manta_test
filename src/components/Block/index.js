import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Block = ({ blockHeader }) => {  
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body1"
                color="text.primary"
              >
                Block Number:
              </Typography>
              { `${blockHeader.number}` }
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body1"
                color="text.primary"
              >
                Block Hash:
              </Typography>
              { `${blockHeader.hash}` }
            </React.Fragment>
          }
        />
    </ListItem>
  );
};

export default Block;