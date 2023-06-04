import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaceState } from 'interfaces/place'
import { PlaceRequest } from 'interfaces/placeRequest'
import axios from 'axios'

export const initialPlaceState: PlaceState = {
  searchText: '',
  list: [],
  loading: false
}

export const fetchPlaceList = createAsyncThunk(
  'place/fetchPlaceList',
  async (placeRequest: PlaceRequest) => {
    const response = await axios.get('/api/place', { params: {searchText: placeRequest.searchText}})
    return response.data
  }
)


export const placeSlice = createSlice({
  name: 'place',
  initialState: initialPlaceState,
  reducers: {
    searchKeyword: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceList.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPlaceList.fulfilled, (state, action) => {
        state.loading = false
        console.log('playload', action.payload)
        state.list = action.payload
      })
      .addCase(fetchPlaceList.rejected, (state) => {
        state.loading = false
      })
  }
})

// export const selectTrips = (state: State):PlaceState => state.placeSlice

export const action = placeSlice.actions

export const { searchKeyword } = placeSlice.actions

export default placeSlice.reducer