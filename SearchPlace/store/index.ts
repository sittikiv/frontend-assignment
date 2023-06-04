import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import placeSlice from './place/placeSlice'

export const store = configureStore({
  reducer: {
    place: placeSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export type Dispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Action<string>
>
