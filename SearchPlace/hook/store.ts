import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { State, Dispatch } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector