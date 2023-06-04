import * as React from 'react';
import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'hook/store'
import { fetchPlaceList, searchKeyword } from 'store/place/placeSlice'
import { PlaceRequest } from 'interfaces/placeRequest'

const Search = styled('div')(({ theme }: any) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }: any) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: any) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));



  export default function SearchAppBar() {
  const searchText = useSelector((state: RootState) => state.place.searchText)
  const dispatch = useAppDispatch()
  const _handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      const PlaceRequest: PlaceRequest = {
        searchText: e.target.value
      }
      dispatch(fetchPlaceList(PlaceRequest))
    }
  }
  useEffect(() => {
    const PlaceRequest: PlaceRequest = {
      searchText: ''
    }
    dispatch(fetchPlaceList(PlaceRequest))
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            FoodFinder
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Restaurants…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e: any) => dispatch(searchKeyword(e.target.value))}
              value={searchText}
              onKeyDown={_handleKeyDown}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}