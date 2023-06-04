import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { Place } from 'interfaces/place'

export default function AlignItemsList() {
  const listPlace: Place[] = useSelector((state: RootState) => state.place.list)
  const loading: boolean = useSelector((state: RootState) => state.place.loading)
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        listPlace.length ? (
          <List sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
            {
              listPlace.map((place: Place) =>{
                return (
                  <>
                    <Link href={place.mapsLink} underline="none" target="_blank">
                      <ListItem alignItems="flex-start" key={place.place_id} sx={{
                        '&:hover': {opacity: '1', cursor: 'pointer'},
                        opacity: '0.8'
                      }}>
                        <ListItemAvatar sx={{
                          marginRight: '10px'
                        }}>
                          <Avatar
                            sx={{
                              borderRadius: '8px',
                              minWidth: '150px',
                              minHeight: '150px'
                            }}
                            alt="Remy Sharp"
                            src={place.photoUrl} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <label htmlFor="">{place.name || '-'}</label>
                            </>
                            }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {place.formatted_address}
                              </Typography>
                              <Typography>
                                <Box sx={{ display: 'flex'}}>
                                  <Icon color="primary">star</Icon>
                                  {`— Rating ${place.rating  || '-'} (จาก ${place.user_ratings_total  || '-'} คนรีวิว)`}
                                </Box>
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Link>
                    <Divider variant="inset" component="li" />
                  </>
                )
              })
            }
          </List>
        ) : (
          <>
            <label htmlFor="">ไม่พบข้อมูลกรุณาค้นหาใหม่</label>
          </>
        )
      }
    </>
  );
}