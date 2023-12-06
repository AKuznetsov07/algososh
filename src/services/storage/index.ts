import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../reducers";
import { TStringActions } from "../actions/stringActions";
import { store } from "./store";


export type AppState = ReturnType<typeof rootReducer>;

type AppActions = TStringActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    AppActions
>;

export type AppDispatch = ThunkDispatch<AppState, never, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;